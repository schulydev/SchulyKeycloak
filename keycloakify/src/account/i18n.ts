/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/account";
import type { ThemeName } from "../kc.gen";

const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            backTo: "Back to {0}",
            backToApplication: "Back to application"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
