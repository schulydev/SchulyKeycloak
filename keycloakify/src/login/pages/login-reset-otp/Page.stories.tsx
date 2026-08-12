import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-otp.ftl" });

const meta = {
    title: "login/login-reset-otp.ftl",
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

export const WithoutOtpCredentials: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [],
                selectedCredentialId: undefined
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
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [
                    { id: "otp1", userLabel: "Device 1" },
                    { id: "otp2", userLabel: "Device 2" }
                ],
                selectedCredentialId: "otp1"
            },
            messagesPerField: {
                existsError: (field: string) => field === "totp",
                get: () => "Invalid OTP selection"
            }
        }
    }
};

export const WithOnlyOneOtpCredential: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login"
            },
            configuredOtpCredentials: {
                userOtpCredentials: [{ id: "otp1", userLabel: "Device 1" }],
                selectedCredentialId: "otp1"
            },
            messagesPerField: {
                existsError: () => false
            }
        }
    }
};
