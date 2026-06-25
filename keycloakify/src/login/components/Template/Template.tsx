import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { RotateCcw, User } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { Languages } from '../ui/Langauges';
import companylogo from "./../../assets/img/app-icon.png";
import { useInitializeTemplate } from "./useInitializeTemplate";

const APP_NAME = "Schuly";

export function Template(props: { displayInfo?: boolean; displayMessage?: boolean; displayRequiredFields?: boolean; headerNode: ReactNode; socialProvidersNode?: ReactNode; infoNode?: ReactNode; documentTitle?: string; bodyClassName?: string; children: ReactNode; }) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        children
    } = props;

    const { kcContext } = useKcContext();

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { msg, msgStr, enabledLanguages } = useI18n();

    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title =
            documentTitle ??
            msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    useInitializeTemplate();

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            {enabledLanguages.length > 1 && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <Languages />
                </div>
            )}

            <div className="flex w-full max-w-sm flex-col gap-6">
                {/* Schuly brand — centered above the card */}
                <a href={url.loginUrl} className="flex items-center gap-2 self-center font-medium">
                    <img src={companylogo} alt="Logo" className="h-8 w-8" />
                    <span className="text-xl font-semibold">{APP_NAME}</span>
                </a>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {(() => {
                                const node = !(
                                    auth !== undefined &&
                                    auth.showUsername &&
                                    !auth.showResetCredentials
                                ) ? (
                                    <h1 className="text-xl">{headerNode}</h1>
                                ) : (
                                    <div
                                        id="kc-username"
                                        className="flex items-center justify-between gap-2"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <User className="text-muted-foreground size-6" />

                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-normal text-muted-foreground">
                                                    {msgStr("attemptedUsernameLoggingInAs")}
                                                </span>
                                                <label
                                                    className="font-semibold text-lg"
                                                    id="kc-attempted-username"
                                                >
                                                    {auth.attemptedUsername}
                                                </label>
                                            </div>
                                        </div>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a
                                                            id="reset-login"
                                                            href={url.loginRestartFlowUrl}
                                                            aria-label={msgStr("restartLoginTooltip")}
                                                        >
                                                            <RotateCcw className="size-4" />
                                                        </a>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{msg("restartLoginTooltip")}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <div className="flex items-center justify-between gap-2">
                                            <div>{node}</div>
                                            <div>
                                                <span className="subtitle">
                                                    <span className="text-red-500">*</span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }

                                return node;
                            })()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="kc-content" className="space-y-4">
                            {displayMessage &&
                                message !== undefined &&
                                (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <Alert variant={message.type}>
                                        <AlertDescription>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(message.summary)
                                                }}
                                            />
                                        </AlertDescription>
                                    </Alert>
                                )}
                            {children}
                            {socialProvidersNode}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                >
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />

                                        <Button type="button" className='w-full' variant="outline" asChild>
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={event => {
                                                    document.forms[
                                                        "kc-select-try-another-way-form" as never
                                                    ].submit();
                                                    event.preventDefault();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </Button>
                                    </div>
                                </form>
                            )}
                            {displayInfo && (
                                <div className="text-center text-sm">{infoNode}</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
