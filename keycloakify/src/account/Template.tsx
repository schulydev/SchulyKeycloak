import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import schulyLogo from "../login/assets/img/app-icon.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { url, features, realm, message, referrer } = kcContext;

    useEffect(() => {
        document.title = msgStr("accountManagementTitle");
    }, [msgStr]);

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const navItems = [
        { id: "account", label: msg("account"), href: url.accountUrl, show: true },
        { id: "password", label: msg("password"), href: url.passwordUrl, show: features.passwordUpdateSupported },
        { id: "totp", label: msg("authenticator"), href: url.totpUrl, show: true },
        { id: "social", label: msg("federatedIdentity"), href: url.socialUrl, show: features.identityFederation },
        { id: "sessions", label: msg("sessions"), href: url.sessionsUrl, show: true },
        { id: "applications", label: msg("applications"), href: url.applicationsUrl, show: true },
        { id: "log", label: msg("log"), href: url.logUrl, show: features.log }
    ].filter(item => item.show);

    return (
        <div className="min-h-screen bg-background text-foreground font-geist">
            <header className="border-b border-border">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <a href={url.accountUrl} className="flex items-center gap-2 font-semibold">
                        <img src={schulyLogo} alt="Schuly" className="size-8 rounded-lg" />
                        <span className="text-lg">Schuly</span>
                    </a>
                    <div className="flex items-center gap-2">
                        {referrer?.url && (
                            <Button variant="ghost" size="sm" asChild>
                                <a href={referrer.url}>{msg("backTo", referrer.name)}</a>
                            </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                            <a href={url.getLogoutUrl()}>
                                <LogOut className="size-4" />
                                {msg("doSignOut")}
                            </a>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row">
                <nav className="md:w-56 md:shrink-0">
                    <ul className="flex flex-row flex-wrap gap-1 md:flex-col">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    aria-current={active === item.id ? "page" : undefined}
                                    className={clsx(
                                        "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        active === item.id
                                            ? "bg-secondary text-secondary-foreground"
                                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                                    )}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <main className="min-w-0 flex-1">
                    {message !== undefined && (
                        <div
                            className={clsx(
                                "mb-6 rounded-md border px-4 py-3 text-sm",
                                message.type === "success" && "border-primary/30 bg-primary/10 text-foreground",
                                message.type === "error" && "border-destructive/40 bg-destructive/10 text-destructive",
                                message.type === "warning" && "border-yellow-500/40 bg-yellow-500/10",
                                message.type === "info" && "border-border bg-secondary/40"
                            )}
                        >
                            <span
                                className={kcClsx("kcFeedbackTextClass")}
                                dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                            />
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
