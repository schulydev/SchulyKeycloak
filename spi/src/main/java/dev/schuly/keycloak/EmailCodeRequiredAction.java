package dev.schuly.keycloak;

import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.core.Response;
import org.keycloak.authentication.RequiredActionContext;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.email.EmailException;
import org.keycloak.email.EmailTemplateProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.sessions.AuthenticationSessionModel;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * A required action that verifies a user's email with a 6-digit code they type
 * in, instead of Keycloak's default click-a-magic-link flow. On challenge it
 * generates a code, stores it (with a short TTL) on the authentication session,
 * emails it, and renders the {@code login-verify-email.ftl} page as a code-entry
 * form. On submit it checks the code and marks the email verified.
 */
public class EmailCodeRequiredAction implements RequiredActionProvider {

    private static final Logger LOG = Logger.getLogger(EmailCodeRequiredAction.class.getName());

    private static final String TEMPLATE = "login-verify-email.ftl";
    private static final String NOTE_CODE = "email-verification-code";
    private static final String NOTE_EXPIRY = "email-verification-code-expiry";
    private static final long TTL_MILLIS = 5 * 60 * 1000L;
    private static final long TTL_MINUTES = TTL_MILLIS / 60000L;
    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    public void evaluateTriggers(RequiredActionContext context) {
        // Added as a realm default action at registration; nothing to trigger here.
    }

    @Override
    public void requiredActionChallenge(RequiredActionContext context) {
        if (context.getUser().isEmailVerified()) {
            context.success();
            return;
        }
        sendCode(context);
        context.challenge(context.form().createForm(TEMPLATE));
    }

    @Override
    public void processAction(RequiredActionContext context) {
        MultivaluedMap<String, String> form = context.getHttpRequest().getDecodedFormParameters();

        if (form.containsKey("resend")) {
            sendCode(context);
            context.challenge(context.form()
                    .setInfo("A new code has been sent to your email.")
                    .createForm(TEMPLATE));
            return;
        }

        String submitted = form.getFirst("code");
        AuthenticationSessionModel authSession = context.getAuthenticationSession();
        String expected = authSession.getAuthNote(NOTE_CODE);
        String expiryStr = authSession.getAuthNote(NOTE_EXPIRY);

        boolean expired = expiryStr == null || System.currentTimeMillis() > Long.parseLong(expiryStr);
        boolean matches = expected != null && submitted != null && expected.equals(submitted.trim());

        if (!matches || expired) {
            context.challenge(context.form()
                    .setError(expired ? "The code has expired. Request a new one." : "Invalid code. Please try again.")
                    .createForm(TEMPLATE));
            return;
        }

        context.getUser().setEmailVerified(true);
        authSession.removeAuthNote(NOTE_CODE);
        authSession.removeAuthNote(NOTE_EXPIRY);
        context.success();
    }

    private void sendCode(RequiredActionContext context) {
        String code = String.format("%06d", RANDOM.nextInt(1_000_000));
        AuthenticationSessionModel authSession = context.getAuthenticationSession();
        authSession.setAuthNote(NOTE_CODE, code);
        authSession.setAuthNote(NOTE_EXPIRY, String.valueOf(System.currentTimeMillis() + TTL_MILLIS));

        KeycloakSession session = context.getSession();
        RealmModel realm = context.getRealm();
        UserModel user = context.getUser();
        try {
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("code", code);
            attributes.put("ttlMinutes", TTL_MINUTES);
            session.getProvider(EmailTemplateProvider.class)
                    .setRealm(realm)
                    .setUser(user)
                    .send("emailVerificationSubject", "email-verification-code.ftl", attributes);
        } catch (EmailException e) {
            LOG.log(Level.SEVERE, "Failed to send email verification code", e);
            throw new RuntimeException("Failed to send verification code email", e);
        }
    }

    @Override
    public void close() {
    }
}
