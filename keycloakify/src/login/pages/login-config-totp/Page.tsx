import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LogoutOtherSessions } from "@/login/components/LogoutOtherSessions";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useEffect, useState } from "react";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

type KcContextLoginConfigTotp = Extract<
    ReturnType<typeof useKcContext>["kcContext"],
    { pageId: "login-config-totp.ftl" }
>;

/**
 * Build the `otpauth://` URI that authenticator apps understand. On mobile this
 * lets the OS hand off to the installed authenticator instead of forcing the
 * user to scan a QR code shown on the same device. The secret is the Base32
 * value Keycloak already renders (`totpSecretEncoded`), just stripped of the
 * grouping whitespace.
 */
function buildOtpAuthUri(kcContext: KcContextLoginConfigTotp): string {
    const { totp, realm, auth } = kcContext;

    const secret = totp.totpSecretEncoded.replace(/\s/g, "");
    const issuer = realm.displayName || realm.name || "";
    const accountName = auth?.attemptedUsername || issuer;

    const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}`;

    const params = new URLSearchParams();
    params.set("secret", secret);
    if (issuer) {
        params.set("issuer", issuer);
    }
    params.set("algorithm", totp.policy.getAlgorithmKey());
    params.set("digits", String(totp.policy.digits));
    if (totp.policy.type === "totp") {
        params.set("period", String(totp.policy.period));
    } else {
        params.set("counter", String(totp.policy.initialCounter));
    }

    return `otpauth://${totp.policy.type}/${label}?${params.toString()}`;
}

function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(
            /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|Opera Mini|IEMobile/i.test(
                navigator.userAgent
            )
        );
    }, []);

    return isMobile;
}

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-config-totp.ftl");

    const { msg, msgStr, advancedMsg } = useI18n();

    const { kcClsx } = useKcClsx();

    const isMobile = useIsMobile();
    const otpAuthUri = buildOtpAuthUri(kcContext);

    return (
        <Template
            headerNode={msg("loginTotpTitle")}
            displayMessage={!kcContext.messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol
                    id="kc-totp-settings"
                    className="list-decimal space-y-4 text-sm text-gray-700 dark:text-gray-300"
                >
                    <li className="space-y-2">
                        <p>{msg("loginTotpStep1")}</p>
                        <ul
                            className="list-disc list-inside ml-4 space-y-1"
                            id="kc-totp-supported-apps"
                        >
                            {kcContext.totp.supportedApplications.map(app => (
                                <li
                                    className="text-blue-600 dark:text-blue-400"
                                    key={app}
                                >
                                    {advancedMsg(app)}
                                </li>
                            ))}
                        </ul>
                    </li>

                    {kcContext.mode == "manual" ? (
                        <>
                            <li>
                                <p className="mb-3">{msg("loginTotpManualStep2")}</p>
                                <div className="bg-muted/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div>
                                        <span
                                            id="kc-totp-secret-key"
                                            className="font-mono text-lg bg-secondary px-3 py-2 rounded border break-all"
                                        >
                                            {kcContext.totp.totpSecretEncoded}
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="outline" asChild>
                                            <a
                                                href={kcContext.totp.qrUrl}
                                                className="text-sm"
                                            >
                                                {msg("loginTotpScanBarcode")}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p className="mb-3">{msg("loginTotpManualStep3")}</p>
                                <div className="bg-muted/30 p-4 rounded-lg border">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpType")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {msg(
                                                    `loginTotp.${kcContext.totp.policy.type}`
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpAlgorithm")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {kcContext.totp.policy.getAlgorithmKey()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpDigits")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {kcContext.totp.policy.digits}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {kcContext.totp.policy.type === "totp"
                                                    ? msg("loginTotpInterval")
                                                    : msg("loginTotpCounter")}
                                                :
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {kcContext.totp.policy.type === "totp"
                                                    ? kcContext.totp.policy.period
                                                    : kcContext.totp.policy
                                                          .initialCounter}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <li className="space-y-2">
                            <p>{msg("loginTotpStep2")}</p>

                            {isMobile && (
                                <div className="space-y-1">
                                    <Button asChild className="w-full">
                                        <a
                                            href={otpAuthUri}
                                            id="kc-totp-add-to-app"
                                            rel="nofollow"
                                        >
                                            {msg("loginTotpAddToApp")}
                                        </a>
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center">
                                        {msg("loginTotpScanWithOtherDevice")}
                                    </p>
                                </div>
                            )}

                            <img
                                id="kc-totp-secret-qr-code"
                                className="mt-2 dark:mt-0"
                                src={`data:image/png;base64, ${kcContext.totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />

                            <Button variant="outline" asChild>
                                <a href={kcContext.totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </Button>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form
                    action={kcContext.url.loginAction}
                    className="space-y-4"
                    id="kc-totp-settings-form"
                    method="post"
                >
                    <div className={kcClsx("kcFormGroupClass")}>
                        <Field>
                            <FieldLabel htmlFor="totp">
                                {msg("authenticatorCode")}{" "}
                                <span className="required">*</span>
                            </FieldLabel>
                            <Input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                aria-invalid={kcContext.messagesPerField.existsError(
                                    "totp"
                                )}
                            />
                            {kcContext.messagesPerField.existsError("totp") && (
                                <FieldError>
                                    {" "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                kcContext.messagesPerField.get("totp")
                                            )
                                        }}
                                    />
                                </FieldError>
                            )}
                        </Field>
                        <input
                            type="hidden"
                            id="totpSecret"
                            name="totpSecret"
                            value={kcContext.totp.totpSecret}
                        />
                        {kcContext.mode && (
                            <input type="hidden" id="mode" value={kcContext.mode} />
                        )}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Field>
                            <FieldLabel htmlFor="userLabel">
                                {msg("loginTotpDeviceName")}{" "}
                                {kcContext.totp.otpCredentials.length >= 1 && (
                                    <span className="required">*</span>
                                )}
                            </FieldLabel>
                            <Input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={kcContext.messagesPerField.existsError(
                                    "userLabel"
                                )}
                            />
                            {kcContext.messagesPerField.existsError("userLabel") && (
                                <FieldError>
                                    {" "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                kcContext.messagesPerField.get(
                                                    "userLabel"
                                                )
                                            )
                                        }}
                                    />
                                </FieldError>
                            )}
                        </Field>
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions />
                    </div>

                    {kcContext.isAppInitiatedAction ? (
                        <>
                            <div className="flex justify-between gap-3">
                                <Button
                                    variant="secondary"
                                    value="true"
                                    id="cancelTOTPBtn"
                                    name="cancel-aia"
                                    type="submit"
                                    className="flex-1"
                                >
                                    {msgStr("doCancel")}
                                </Button>
                                <Button id="saveTOTPBtn" type="submit" className="flex-1">
                                    {msgStr("doSubmit")}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button id="saveTOTPBtn" className="w-full" type="submit">
                            {msgStr("doSubmit")}
                        </Button>
                    )}
                </form>
            </>
        </Template>
    );
}
