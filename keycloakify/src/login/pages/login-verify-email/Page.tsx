import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { useState } from "react";
import { assert } from "tsafe/assert";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-verify-email.ftl");

    const { msg } = useI18n();
    const { url, user } = kcContext;
    const [code, setCode] = useState("");

    return (
        <Template displayMessage headerNode={msg("emailVerifyTitle")}>
            <p className="instruction mb-6">
                We sent a 6-digit code to <b>{user?.email ?? "your email"}</b>. Enter it
                below to confirm your account.
            </p>
            <form action={url.loginAction} method="post" className="space-y-5">
                <input type="hidden" name="code" value={code} />
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={code} onChange={setCode} autoFocus>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button type="submit" className="w-full" disabled={code.length < 6}>
                    Confirm
                </Button>
            </form>
            <form action={url.loginAction} method="post" className="mt-3">
                <input type="hidden" name="resend" value="true" />
                <Button type="submit" variant="ghost" className="w-full">
                    Resend code
                </Button>
            </form>
        </Template>
    );
}
