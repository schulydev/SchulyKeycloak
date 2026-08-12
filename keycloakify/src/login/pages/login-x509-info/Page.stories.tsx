import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-x509-info.ftl" });

const meta = {
    title: "login/login-x509-info.ftl",
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

export const WithoutUserEnabled: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            x509: {
                formData: {
                    subjectDN: "CN=John Doe, OU=Example Org, O=Example Inc, C=US",
                    username: "johndoe",
                    isUserEnabled: false // User not enabled for login
                }
            }
        }
    }
};
