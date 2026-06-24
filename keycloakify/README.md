# Schuly login theme

The branded [Keycloakify](https://keycloakify.dev) login theme for Schuly Keycloak
(React + Vite + Tailwind + shadcn UI). It's built into a Keycloak provider jar at
image-build time and selected by the `schuly` realm (`loginTheme: "schuly"`).

> Use **bun** as the package manager (a `bun.lock` is committed) — not npm/yarn.

```sh
bun install
bun run dev          # Vite dev server
bun run storybook    # preview login pages in isolation (port 6006)
```

See [docs/theme-development.md](../docs/theme-development.md) for the toolchain,
scripts, and how the theme gets baked into the image.
