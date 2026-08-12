import {
    type ExtendKcContext,
    createUseKcContext
} from "@keycloakify/login-ui/KcContext";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    client: {
        baseUrl?: string;
    };
    darkMode?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type KcContextExtensionPerPage = {};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

export const { useKcContext, KcContextProvider } = createUseKcContext<KcContext>();
