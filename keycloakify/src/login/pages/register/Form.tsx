import { Button } from "@/components/ui/button";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useEffect, useState, type FormEvent } from "react";
import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { useI18n } from "../../i18n";
import { TermsAcceptance } from "./TermsAcceptance";

export function Form() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");
    const { kcClsx } = useKcClsx();
    const { msg, msgStr } = useI18n();

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    const recaptchaRequired = kcContext.recaptchaRequired;
    const recaptchaSiteKey = kcContext.recaptchaSiteKey;
    const recaptchaAction = kcContext.recaptchaAction;

    // reCAPTCHA v3 is invisible: load the API with the site key on mount, then on
    // submit fetch a token for the action and POST it in the `g-recaptcha-response`
    // field (the param Keycloak's recaptcha authenticator reads). No widget.
    useEffect(() => {
        if (!recaptchaRequired || recaptchaSiteKey === undefined) {
            return;
        }
        const src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        if (document.querySelector(`script[src="${src}"]`) !== null) {
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }, [recaptchaRequired, recaptchaSiteKey]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!recaptchaRequired || recaptchaSiteKey === undefined) {
            return; // no captcha -> let the form submit normally
        }
        event.preventDefault();
        const form = event.currentTarget;
        const grecaptcha = (window as any).grecaptcha;
        if (grecaptcha === undefined) {
            form.submit();
            return;
        }
        grecaptcha.ready(() => {
            grecaptcha
                .execute(recaptchaSiteKey, { action: recaptchaAction ?? "register" })
                .then((token: string) => {
                    let field = form.querySelector<HTMLInputElement>(
                        'input[name="g-recaptcha-response"]'
                    );
                    if (field === null) {
                        field = document.createElement("input");
                        field.type = "hidden";
                        field.name = "g-recaptcha-response";
                        form.appendChild(field);
                    }
                    field.value = token;
                    form.submit();
                });
        });
    };

    return (
        <form
            id="kc-register-form"
            action={kcContext.url.registrationAction}
            className="space-y-4"
            method="post"
            onSubmit={onSubmit}
        >
            <UserProfileFormFields
                onIsFormSubmittableValueChange={setIsFormSubmittable}
            />
            {kcContext.termsAcceptanceRequired && (
                <TermsAcceptance
                    messagesPerField={kcContext.messagesPerField}
                    areTermsAccepted={areTermsAccepted}
                    onAreTermsAcceptedValueChange={setAreTermsAccepted}
                />
            )}
            <div className={kcClsx("kcFormGroupClass")}>
                <Button
                    disabled={
                        !isFormSubmittable ||
                        (kcContext.termsAcceptanceRequired && !areTermsAccepted)
                    }
                    className="w-full mt-2"
                    name="register"
                    type="submit"
                >
                    {msgStr("doRegister")}
                </Button>
            </div>

            <div className=" flex justify-end">
                <Button type="button" variant="ghost">
                    <a href={kcContext.url.loginUrl}>{msg("backToLogin")}</a>
                </Button>
            </div>
        </form>
    );
}
