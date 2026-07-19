package dev.schuly.keycloak.avatar;

import java.net.URI;
import java.util.Base64;
import java.util.Map;
import java.util.Set;

import jakarta.persistence.EntityManager;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.keycloak.common.util.Time;
import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.services.managers.AppAuthManager;
import org.keycloak.services.managers.AuthenticationManager.AuthResult;
import org.keycloak.urls.UrlType;

/**
 * REST resource mounted at <code>/realms/{realm}/avatar</code>.
 *
 * <ul>
 *   <li><b>PUT /avatar/me</b> — bearer-authenticated; body {@code {"contentType","data"}}
 *       where {@code data} is base64 image bytes. Stores the image and sets the caller's
 *       {@code picture} attribute to the serve URL so the OIDC {@code picture} claim carries it.</li>
 *   <li><b>DELETE /avatar/me</b> — removes the caller's avatar + {@code picture} attribute.</li>
 *   <li><b>GET /avatar/{userId}</b> — serves the image bytes (public; avatars aren't secret).</li>
 * </ul>
 *
 * A base64 JSON body is used deliberately instead of multipart/form-data to avoid the
 * Keycloak 26 reactive-multipart regression.
 */
public class AvatarResource {

    private static final long MAX_BYTES = 1024L * 1024L; // 1 MB decoded
    private static final Set<String> ALLOWED_TYPES = Set.of("image/png", "image/jpeg", "image/webp", "image/gif");

    private final KeycloakSession session;

    public AvatarResource(KeycloakSession session) {
        this.session = session;
    }

    public static class UploadRequest {
        public String contentType;
        public String data;
    }

    @PUT
    @Path("me")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response upload(UploadRequest body) {
        UserModel user = requireUser();
        if (body == null || body.data == null || body.data.isBlank()) {
            throw new BadRequestException("Missing image data");
        }
        String contentType = (body.contentType == null || body.contentType.isBlank()) ? "image/png" : body.contentType.toLowerCase();
        if (!ALLOWED_TYPES.contains(contentType)) {
            throw new BadRequestException("Unsupported content type: " + contentType);
        }
        String base64 = stripDataUri(body.data.trim());
        byte[] bytes;
        try {
            bytes = Base64.getDecoder().decode(base64);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid base64 image data");
        }
        if (bytes.length == 0 || bytes.length > MAX_BYTES) {
            throw new BadRequestException("Image must be between 1 byte and 1 MB");
        }

        RealmModel realm = session.getContext().getRealm();
        EntityManager em = em();
        AvatarEntity entity = em.find(AvatarEntity.class, user.getId());
        boolean isNew = entity == null;
        if (isNew) {
            entity = new AvatarEntity();
            entity.setUserId(user.getId());
        }
        entity.setRealmId(realm.getId());
        entity.setContentType(contentType);
        entity.setData(Base64.getEncoder().encodeToString(bytes));
        entity.setUpdatedAt(Time.currentTimeMillis());
        if (isNew) {
            em.persist(entity);
        }

        String url = avatarUrl(realm, user.getId(), entity.getUpdatedAt());
        user.setSingleAttribute("picture", url);

        return Response.ok(Map.of("picture", url)).build();
    }

    @DELETE
    @Path("me")
    public Response delete() {
        UserModel user = requireUser();
        EntityManager em = em();
        AvatarEntity entity = em.find(AvatarEntity.class, user.getId());
        if (entity != null) {
            em.remove(entity);
        }
        user.removeAttribute("picture");
        return Response.noContent().build();
    }

    @GET
    @Path("{userId}")
    public Response get(@PathParam("userId") String userId) {
        AvatarEntity entity = em().find(AvatarEntity.class, userId);
        if (entity == null || entity.getData() == null) {
            throw new NotFoundException();
        }
        byte[] bytes = Base64.getDecoder().decode(entity.getData());
        return Response.ok(bytes, entity.getContentType())
                .header("Cache-Control", "public, max-age=300")
                .build();
    }

    private UserModel requireUser() {
        AuthResult auth = new AppAuthManager.BearerTokenAuthenticator(session).authenticate();
        if (auth == null || auth.getUser() == null) {
            throw new NotAuthorizedException("Bearer");
        }
        return auth.getUser();
    }

    private EntityManager em() {
        return session.getProvider(JpaConnectionProvider.class).getEntityManager();
    }

    /** Absolute serve URL, cache-busted by the update timestamp so clients refetch on change. */
    private String avatarUrl(RealmModel realm, String userId, long version) {
        URI base = session.getContext().getUri(UrlType.FRONTEND).getBaseUri();
        String root = base.toString().replaceAll("/+$", "");
        return root + "/realms/" + realm.getName() + "/avatar/" + userId + "?v=" + version;
    }

    /** Accepts either a bare base64 string or a full {@code data:image/...;base64,...} URI. */
    private static String stripDataUri(String value) {
        int comma = value.indexOf(',');
        if (value.startsWith("data:") && comma > 0) {
            return value.substring(comma + 1);
        }
        return value;
    }
}
