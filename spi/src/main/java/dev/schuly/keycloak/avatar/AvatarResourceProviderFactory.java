package dev.schuly.keycloak.avatar;

import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.services.resource.RealmResourceProvider;
import org.keycloak.services.resource.RealmResourceProviderFactory;

/** Mounts the avatar REST resource at <code>/realms/{realm}/avatar</code>. */
public class AvatarResourceProviderFactory implements RealmResourceProviderFactory {

    public static final String ID = "avatar";

    @Override
    public RealmResourceProvider create(KeycloakSession session) {
        return new AvatarResourceProvider(session);
    }

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public void init(Config.Scope config) {
    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {
    }

    @Override
    public void close() {
    }
}
