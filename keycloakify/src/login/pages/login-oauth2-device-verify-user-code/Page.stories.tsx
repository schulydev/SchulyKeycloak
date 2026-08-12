import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({
    pageId: "login-oauth2-device-verify-user-code.ftl"
});

const meta = {
    title: "login/login-oauth2-device-verify-user-code.ftl",
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

export const WithErrorMessage: Story = {
    args: {
        kcContext: {
            url: {
                oauth2DeviceVerificationAction: "/mock-oauth2-device-verification"
            },
            message: {
                summary: "The user code you entered is invalid. Please try again.",
                type: "error"
            }
        }
    }
};

export const WithEmptyInputField: Story = {
    args: {
        kcContext: {
            url: {
                oauth2DeviceVerificationAction: "/mock-oauth2-device-verification"
            },
            message: {
                summary: "User code cannot be empty. Please enter a valid code.",
                type: "error"
            }
        }
    }
};
