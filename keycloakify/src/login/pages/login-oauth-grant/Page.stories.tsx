import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const mockKcContext = {
    url: {
        oauthAction: "/oauth-action"
    },
    oauth: {
        clientScopesRequested: [
            { consentScreenText: "Scope1", dynamicScopeParameter: "dynamicScope1" },
            { consentScreenText: "Scope2" }
        ],
        code: "mockCode"
    },
    client: {
        attributes: {
            policyUri: "https://twitter.com/en/tos",
            tosUri: "https://twitter.com/en/privacy"
        },
        name: "Twitter",
        clientId: "twitter-client-id"
    }
};

const { KcPageStory } = createKcPageStory({ pageId: "login-oauth-grant.ftl" });

const meta = {
    title: "login/login-oauth-grant.ftl",
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

export const WithoutScopes: Story = {
    args: {
        kcContext: {
            ...mockKcContext,
            oauth: {
                ...mockKcContext.oauth,
                clientScopesRequested: []
            }
        }
    }
};

export const WithFormSubmissionError: Story = {
    args: {
        kcContext: {
            ...mockKcContext,
            url: {
                oauthAction: "/error"
            },
            message: {
                type: "error",
                summary: "An error occurred during form submission."
            }
        }
    }
};
