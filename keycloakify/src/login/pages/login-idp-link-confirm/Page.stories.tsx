import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

// Mock kcContext to avoid the TS2304 error
const mockKcContext = {
    url: {
        loginAction: "/login-action"
    },
    idpAlias: "mockIdpAlias"
};

const { KcPageStory } = createKcPageStory({ pageId: "login-idp-link-confirm.ftl" });

const meta = {
    title: "login/login-idp-link-confirm.ftl",
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
