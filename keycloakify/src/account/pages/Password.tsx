import { useState } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, password, account, stateChecker } = kcContext;

    const { msgStr, msg } = i18n;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
    const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
    const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

    const checkNewPassword = (value: string) => {
        if (!password.passwordSet) {
            return;
        }
        setNewPasswordError(value === currentPassword ? msgStr("newPasswordSameAsOld") : "");
    };

    const checkNewPasswordConfirm = (value: string) => {
        if (value === "") {
            return;
        }
        setNewPasswordConfirmError(newPassword !== value ? msgStr("passwordConfirmNotMatch") : "");
    };

    const message = newPasswordError !== "" ? { type: "error" as const, summary: newPasswordError } : newPasswordConfirmError !== "" ? { type: "error" as const, summary: newPasswordConfirmError } : kcContext.message;

    return (
        <Template {...{ kcContext: { ...kcContext, message }, i18n, doUseDefaultCss, classes }} active="password">
            <Card>
                <CardHeader>
                    <CardTitle>{msg("changePasswordHtmlTitle")}</CardTitle>
                    <CardDescription>{msg("allFieldsRequired")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={url.passwordUrl} method="post" className="space-y-5">
                        <input type="text" id="username" name="username" value={account.username ?? ""} autoComplete="username" readOnly className="hidden" />
                        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                        {password.passwordSet && (
                            <div className="space-y-2">
                                <Label htmlFor="password">{msg("password")}</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoFocus
                                    autoComplete="current-password"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password-new">{msg("passwordNew")}</Label>
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                autoComplete="new-password"
                                value={newPassword}
                                aria-invalid={newPasswordError !== ""}
                                onChange={e => {
                                    setNewPassword(e.target.value);
                                    if (hasNewPasswordBlurred) checkNewPassword(e.target.value);
                                }}
                                onBlur={() => {
                                    setHasNewPasswordBlurred(true);
                                    checkNewPassword(newPassword);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password-confirm">{msg("passwordConfirm")}</Label>
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                autoComplete="new-password"
                                value={newPasswordConfirm}
                                aria-invalid={newPasswordConfirmError !== ""}
                                onChange={e => {
                                    setNewPasswordConfirm(e.target.value);
                                    if (hasNewPasswordConfirmBlurred) checkNewPasswordConfirm(e.target.value);
                                }}
                                onBlur={() => {
                                    setHasNewPasswordConfirmBlurred(true);
                                    checkNewPasswordConfirm(newPasswordConfirm);
                                }}
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" name="submitAction" value="Save" disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}>
                                {msg("doSave")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Template>
    );
}
