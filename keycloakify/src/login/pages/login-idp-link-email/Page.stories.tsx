import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

// Mock kcContext to avoid TS2304 error and to simulate the real environment
const mockKcContext = {
    url: {
        loginAction: "/login-action"
    },
    idpAlias: "mockIdpAlias",
    brokerContext: {
        username: "mockUser"
    },
    realm: {
        displayName: "MockRealm"
    }
};

const { KcPageStory } = createKcPageStory({ pageId: "login-idp-link-email.ftl" });

const meta = {
    title: "login/login-idp-link-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        kcContext: mockKcContext
    }
};

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

export const WithIdpAlias: Story = {
    args: {
        kcContext: {
            ...mockKcContext,
            idpAlias: "Google",
            brokerContext: {
                username: "john.doe"
            },
            realm: {
                displayName: "MyRealm"
            }
        }
    }
};

export const WithCustomRealmDisplayName: Story = {
    args: {
        kcContext: {
            ...mockKcContext,
            idpAlias: "Facebook",
            brokerContext: {
                username: "jane.doe"
            },
            realm: {
                displayName: "CUSTOM REALM DISPLAY NAME"
            }
        }
    }
};

export const WithFormSubmissionError: Story = {
    args: {
        kcContext: {
            ...mockKcContext,
            url: {
                loginAction: "/error"
            },
            message: {
                type: "error",
                summary: "An error occurred during form submission."
            }
        }
    }
};
