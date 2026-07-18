import { Button } from "@/components/ui/button";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useState } from "react";
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

    return (
        <form
            id="kc-register-form"
            action={kcContext.url.registrationAction}
            className="space-y-4"
            method="post"
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
