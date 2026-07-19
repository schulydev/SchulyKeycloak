package dev.schuly.keycloak.avatar;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

/**
 * A user's uploaded avatar, stored in Keycloak's own database. Keyed by user id.
 * The image bytes are held base64-encoded in a text column ({@link #data}) to
 * avoid the Postgres bytea/OID pitfalls of mapping a raw {@code byte[]} / {@code @Lob}.
 * Avatars are small (the resource caps the upload), so this is cheap.
 */
@Entity
@Table(name = "SCHULY_AVATAR")
@NamedQuery(name = "AvatarEntity.deleteByRealm", query = "delete from AvatarEntity a where a.realmId = :realmId")
public class AvatarEntity {

    @Id
    @Column(name = "USER_ID", length = 255)
    private String userId;

    @Column(name = "REALM_ID", length = 255)
    private String realmId;

    @Column(name = "CONTENT_TYPE", length = 100)
    private String contentType;

    // Base64-encoded image bytes; the Liquibase changelog creates this as CLOB/text.
    @Column(name = "DATA")
    private String data;

    @Column(name = "UPDATED_AT")
    private long updatedAt;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getRealmId() { return realmId; }
    public void setRealmId(String realmId) { this.realmId = realmId; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(long updatedAt) { this.updatedAt = updatedAt; }
}
