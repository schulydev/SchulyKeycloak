package dev.schuly.keycloak.avatar;

import java.util.Collections;
import java.util.List;

import org.keycloak.connections.jpa.entityprovider.JpaEntityProvider;

/** Registers {@link AvatarEntity} + its Liquibase changelog so Keycloak creates and manages the table. */
public class AvatarJpaEntityProvider implements JpaEntityProvider {

    @Override
    public List<Class<?>> getEntities() {
        return Collections.singletonList(AvatarEntity.class);
    }

    @Override
    public String getChangelogLocation() {
        return "META-INF/schuly-avatar-changelog.xml";
    }

    @Override
    public String getFactoryId() {
        return AvatarJpaEntityProviderFactory.ID;
    }

    @Override
    public void close() {
    }
}
