import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "select-organization.ftl" });

const meta = {
    title: "login/select-organization.ftl",
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
                currentLanguageTag: "fr",
                rtl: false
            }
        }
    }
};

export const WithManyOrganizations: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            user: {
                organizations: [
                    { alias: "org1", name: "Organization 1" },
                    { alias: "org2", name: "Organization 2" },
                    { alias: "org3", name: "Organization 3" },
                    { alias: "org4", name: "Organization 4" },
                    { alias: "org5", name: "Organization 5" },
                    { alias: "org6", name: "Organization 6" }
                ]
            }
        }
    }
};

export const WithFewOrganizations: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            user: {
                organizations: [
                    { alias: "org1", name: "Organization 1" },
                    { alias: "org2", name: "Organization 2" },
                    { alias: "org3", name: "Organization 3" }
                ]
            }
        }
    }
};

export const WithSingleOrganization: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            user: {
                organizations: [{ alias: "org1", name: "My Organization" }]
            }
        }
    }
};
