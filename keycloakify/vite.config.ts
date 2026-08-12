import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { keycloakify } from "keycloakify/vite-plugin";
import path from "node:path";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            themeName: "schuly",
            accountThemeImplementation: "Multi-Page",
            // We only ship a KC 26.6 image, so build just the 26.2+ jar. Building
            // every version range multiplies Maven Central downloads and any dropped
            // one leaves a `.part` and fails the whole build.
            keycloakVersionTargets: {
                "21-and-below": false,
                "23": false,
                "24": false,
                "25": false,
                "26.0-to-26.1": false,
                "26.2-and-above": true
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
