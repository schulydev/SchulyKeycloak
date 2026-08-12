import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-register.ftl" });

const meta = {
    title: "login/webauthn-register.ftl",
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
            isSetRetry: true,
            isAppInitiatedAction: false
        }
    }
};

export const WithErrorDuringRegistration: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            isSetRetry: false,
            isAppInitiatedAction: false,
            message: {
                summary:
                    "An error occurred during WebAuthn registration. Please try again.",
                type: "error"
            }
        }
    }
};
