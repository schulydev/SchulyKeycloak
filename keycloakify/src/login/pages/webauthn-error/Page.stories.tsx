import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-error.ftl" });

const meta = {
    title: "login/webauthn-error.ftl",
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

export const WithRetryAvailable: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isAppInitiatedAction: false,
            message: {
                summary: "WebAuthn authentication failed. Please try again.",
                type: "error"
            }
        }
    }
};

export const WithAppInitiatedAction: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isAppInitiatedAction: true,
            message: {
                summary: "WebAuthn authentication failed. You can try again or cancel.",
                type: "error"
            }
        }
    }
};

export const WithJavaScriptDisabled: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isAppInitiatedAction: false,
            message: {
                summary: "JavaScript is disabled or not working. Please retry manually.",
                type: "warning"
            }
        }
    }
};
