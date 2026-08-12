import { useKcContext } from "@/login/KcContext";
import { useEffect } from "react";

const SESSION_POLLING_INTERVAL_MS = 2000;
const AUTH_SESSION_TIMEOUT_MS = 1000;

function getCookieByName(name: string) {
    for (const cookie of document.cookie.split(";")) {
        const [key, value] = cookie.split("=").map(value => value.trim());
        if (key === name) {
            return value.startsWith('"') && value.endsWith('"')
                ? value.slice(1, -1)
                : value;
        }
    }
    return null;
}

export function useAuthChecker() {
    const { kcContext } = useKcContext();

    useEffect(() => {
        if (kcContext.authenticationSession === undefined) {
            return;
        }

        const { authSessionIdHash } = kcContext.authenticationSession;

        const timer = setTimeout(() => {
            const authSessionIdHashCookie = getCookieByName("KC_AUTH_SESSION_HASH");
            if (
                authSessionIdHashCookie &&
                authSessionIdHashCookie !== authSessionIdHash
            ) {
                location.reload();
            }
        }, AUTH_SESSION_TIMEOUT_MS);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const keycloakSessionCookie = () => getCookieByName("KEYCLOAK_SESSION");

        if (keycloakSessionCookie() !== null) {
            return;
        }

        let timer: ReturnType<typeof setTimeout>;

        const poll = () => {
            if (keycloakSessionCookie() === null) {
                timer = setTimeout(poll, SESSION_POLLING_INTERVAL_MS);
                return;
            }

            location.href = kcContext.url.ssoLoginInOtherTabsUrl;
        };

        const handleFormSubmit = () => {
            clearTimeout(timer);
        };

        const handleBeforeUnload = () => {
            clearTimeout(timer);
        };

        const forms = Array.from(document.forms);
        forms.forEach(form => {
            form.addEventListener("submit", handleFormSubmit);
        });

        globalThis.addEventListener("beforeunload", handleBeforeUnload);

        poll();

        return () => {
            clearTimeout(timer);
            forms.forEach(form => {
                form.removeEventListener("submit", handleFormSubmit);
            });
            globalThis.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
}
