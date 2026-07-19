import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;

    const { msg } = i18n;

    // The Schuly-branded upload page lives next to the account console.
    const avatarUrl = url.accountUrl.replace(/\/account(\/)?$/, "/avatar/ui");

    const fieldError = (field: string) => messagesPerField.existsError(field);

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile picture</CardTitle>
                        <CardDescription>Upload or change the picture shown across Schuly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline">
                            <a href={avatarUrl}>
                                <ImageUp className="size-4" />
                                Manage profile picture
                            </a>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{msg("editAccountHtmlTitle")}</CardTitle>
                        <CardDescription>
                            <span className="required">*</span> {msg("requiredFields")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={url.accountUrl} method="post" className="space-y-5">
                            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                            {!realm.registrationEmailAsUsername && (
                                <div className="space-y-2">
                                    <Label htmlFor="username">
                                        {msg("username")} {realm.editUsernameAllowed && <span className="required">*</span>}
                                    </Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        disabled={!realm.editUsernameAllowed}
                                        defaultValue={account.username ?? ""}
                                        aria-invalid={fieldError("username")}
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    {msg("email")} <span className="required">*</span>
                                </Label>
                                <Input id="email" name="email" autoFocus defaultValue={account.email ?? ""} aria-invalid={fieldError("email")} />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        {msg("firstName")} <span className="required">*</span>
                                    </Label>
                                    <Input id="firstName" name="firstName" defaultValue={account.firstName ?? ""} aria-invalid={fieldError("firstName")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">
                                        {msg("lastName")} <span className="required">*</span>
                                    </Label>
                                    <Input id="lastName" name="lastName" defaultValue={account.lastName ?? ""} aria-invalid={fieldError("lastName")} />
                                </div>
                            </div>

                            <div className={clsx("flex flex-wrap items-center gap-3 pt-2")}>
                                <Button type="submit" name="submitAction" value="Save">
                                    {msg("doSave")}
                                </Button>
                                <Button type="submit" variant="outline" name="submitAction" value="Cancel">
                                    {msg("doCancel")}
                                </Button>
                                {referrer !== undefined && (
                                    <Button asChild variant="ghost">
                                        <a href={referrer?.url}>{msg("backToApplication")}</a>
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Template>
    );
}
