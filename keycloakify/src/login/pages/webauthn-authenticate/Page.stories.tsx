import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-authenticate.ftl" });

const meta = {
    title: "login/webauthn-authenticate.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTryAnotherWay: Story = {
    args: {
        kcContext: {
            auth: {
                showTryAnotherWayLink: true
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

export const WithMultipleAuthenticators: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            authenticators: {
                authenticators: [
                    {
                        credentialId: "authenticator-1",
                        label: "Security Key 1",
                        transports: {
                            iconClass: "kcAuthenticatorUsbIcon",
                            displayNameProperties: ["USB"]
                        },
                        createdAt: "2023-01-01"
                    },
                    {
                        credentialId: "authenticator-2",
                        label: "Security Key 2",
                        transports: {
                            iconClass: "kcAuthenticatorNfcIcon",
                            displayNameProperties: ["NFC"]
                        },
                        createdAt: "2023-02-01"
                    }
                ]
            },
            shouldDisplayAuthenticators: true
        }
    }
};

export const WithSingleAuthenticator: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            authenticators: {
                authenticators: [
                    {
                        credentialId: "authenticator-1",
                        label: "My Security Key",
                        transports: {
                            iconClass: "kcAuthenticatorUsbIcon",
                            displayNameProperties: ["USB"]
                        },
                        createdAt: "2023-01-01"
                    }
                ]
            },
            shouldDisplayAuthenticators: true
        }
    }
};

export const WithErrorDuringAuthentication: Story = {
    args: {
        kcContext: {
            url: {
                loginAction: "/mock-login-action"
            },
            authenticators: {
                authenticators: [
                    {
                        credentialId: "authenticator-1",
                        label: "My Security Key",
                        transports: {
                            iconClass: "kcAuthenticatorUsbIcon",
                            displayNameProperties: ["USB"]
                        },
                        createdAt: "2023-01-01"
                    }
                ]
            },
            shouldDisplayAuthenticators: true,
            message: {
                summary: "An error occurred during WebAuthn authentication.",
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
            authenticators: {
                authenticators: [
                    {
                        credentialId: "authenticator-1",
                        label: "My Security Key",
                        transports: {
                            iconClass: "kcAuthenticatorUsbIcon",
                            displayNameProperties: ["USB"]
                        },
                        createdAt: "2023-01-01"
                    }
                ]
            },
            shouldDisplayAuthenticators: true
        }
    }
};
