import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-verify-email.ftl" });

const meta = {
    title: "login/login-verify-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        kcContext: {
            message: {
                summary: "You need to verify your email to activate your account.",
                type: "warning"
            },
            user: {
                email: "john.doe@gmail.com"
            }
        }
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

export const WithSuccessMessage: Story = {
    args: {
        kcContext: {
            message: {
                summary: "Your email has been successfully verified.",
                type: "success"
            },
            user: {
                email: "john.doe@gmail.com"
            },
            url: {
                loginAction: "/mock-login-action"
            }
        }
    }
};

export const WithErrorMessage: Story = {
    args: {
        kcContext: {
            message: {
                summary: "There was an error verifying your email. Please try again.",
                type: "error"
            },
            user: {
                email: "john.doe@gmail.com"
            },
            url: {
                loginAction: "/mock-login-action"
            }
        }
    }
};

export const WithInfoMessage: Story = {
    args: {
        kcContext: {
            message: {
                summary: "Please verify your email to continue using our services.",
                type: "info"
            },
            user: {
                email: "john.doe@gmail.com"
            },
            url: {
                loginAction: "/mock-login-action"
            }
        }
    }
};
