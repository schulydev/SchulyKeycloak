import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-otp.ftl" });

const meta = {
    title: "login/login-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Arabic: Story = {
    args: {
        kcContext: {
            locale: {
                currentLanguageTag: "ar",
                rtl: true
            }
        }
    }
};
export const French: Story = {
    args: {
        kcContext: {
            locale: {
                currentLanguageTag: "fr"
            }
        }
    }
};

export const MultipleOtpCredentials: Story = {
    args: {
        kcContext: {
            otpLogin: {
                userOtpCredentials: [
                    { id: "credential1", userLabel: "Device 1" },
                    { id: "credential2", userLabel: "Device 2" },
                    { id: "credential3", userLabel: "Device 3" },
                    { id: "credential4", userLabel: "Device 4" },
                    { id: "credential5", userLabel: "Device 5" },
                    { id: "credential6", userLabel: "Device 6" }
                ],
                selectedCredentialId: "credential1"
            },
            url: {
                loginAction: "/login-action"
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};

export const WithOtpError: Story = {
    args: {
        kcContext: {
            otpLogin: {
                userOtpCredentials: []
            },
            url: {
                loginAction: "/login-action"
            },
            messagesPerField: {
                existsError: (field: string) => field === "totp",
                get: () => "Invalid OTP code"
            }
        }
    }
};

export const NoOtpCredentials: Story = {
    args: {
        kcContext: {
            otpLogin: {
                userOtpCredentials: []
            },
            url: {
                loginAction: "/login-action"
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};

export const WithErrorAndMultipleOtpCredentials: Story = {
    args: {
        kcContext: {
            otpLogin: {
                userOtpCredentials: [
                    { id: "credential1", userLabel: "Device 1" },
                    { id: "credential2", userLabel: "Device 2" }
                ],
                selectedCredentialId: "credential1"
            },
            url: {
                loginAction: "/login-action"
            },
            messagesPerField: {
                existsError: (field: string) => field === "totp",
                get: () => "Invalid OTP code"
            }
        }
    }
};
