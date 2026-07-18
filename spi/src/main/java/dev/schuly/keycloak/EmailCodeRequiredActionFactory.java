package dev.schuly.keycloak;

import org.keycloak.Config;
import org.keycloak.authentication.RequiredActionFactory;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

/** Registers the {@link EmailCodeRequiredAction} so it can be enabled as a realm required action. */
public class EmailCodeRequiredActionFactory implements RequiredActionFactory {

    public static final String PROVIDER_ID = "VERIFY_EMAIL_CODE";
    private static final EmailCodeRequiredAction INSTANCE = new EmailCodeRequiredAction();

    @Override
    public RequiredActionProvider create(KeycloakSession session) {
        return INSTANCE;
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public String getDisplayText() {
        return "Verify Email (code)";
    }

    @Override
    public boolean isOneTimeAction() {
        return true;
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
