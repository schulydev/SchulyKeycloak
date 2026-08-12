import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "logout-confirm.ftl" });

const meta = {
    title: "login/logout-confirm.ftl",
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

export const WithCustomLogoutMessage: Story = {
    args: {
        kcContext: {
            url: {
                logoutConfirmAction: "/mock-logout-action"
            },
            client: {
                baseUrl: "/mock-client-url"
            },
            logoutConfirm: {
                code: "mock-session-code",
                skipLink: false
            },
            message: {
                summary: "Are you sure you want to log out from all sessions?",
                type: "warning"
            }
        }
    }
};
