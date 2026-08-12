# SchulyKeycloak

[![Release](https://img.shields.io/github/v/release/schulydev/SchulyKeycloak)](https://github.com/schulydev/SchulyKeycloak/releases)
[![Build & publish](https://github.com/schulydev/SchulyKeycloak/actions/workflows/docker-publish-release.yaml/badge.svg)](https://github.com/schulydev/SchulyKeycloak/actions/workflows/docker-publish-release.yaml)
[![Documentation](https://img.shields.io/badge/docs-docs.schuly.dev-3da8ff)](https://docs.schuly.dev/SchulyKeycloak/)

Schuly's own [Keycloak](https://www.keycloak.org/) image - the production identity
provider for Schuly. It bakes a [Keycloakify](https://keycloakify.dev) login theme, a
leaked-password blacklist (rockyou), and the `schuly` realm into an **optimized**
Keycloak 26.6 build, then ships as a multi-arch container at
`ghcr.io/schulydev/schulykeycloak`.

## Quickstart (local)

```sh
docker compose -f compose.dev.yml up --build
```

Opens Keycloak at <http://localhost:8080> (admin `admin` / `admin`) with the `schuly`
realm imported automatically.

## Quickstart (production)

```sh
docker run -p 8080:8080 \
  -e KC_DB_URL=jdbc:postgresql://db:5432/keycloak \
  -e KC_DB_USERNAME=keycloak -e KC_DB_PASSWORD=... \
  -e KC_HOSTNAME=https://auth.schuly.dev \
  -e KC_PROXY_HEADERS=xforwarded -e KC_HTTP_ENABLED=true \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=... \
  ghcr.io/schulydev/schulykeycloak:latest
```

For the complete stack (Postgres + reverse proxy + TLS) see
[Self-hosting the full stack](https://docs.schuly.dev/SchulyKeycloak/setup/self-hosting).

## Documentation

Full documentation lives at **[docs.schuly.dev/SchulyKeycloak](https://docs.schuly.dev/SchulyKeycloak/)**.

| Guide | What it covers |
|---|---|
| [Development setup](https://docs.schuly.dev/SchulyKeycloak/setup/development) | Run the image locally with Docker Compose. |
| [Self-hosting](https://docs.schuly.dev/SchulyKeycloak/setup/self-hosting) | Deploy the full stack for production. |
| [Configuration reference](https://docs.schuly.dev/SchulyKeycloak/configuration) | Every port, environment variable, and default (including `SMTP_*`). |
| [Architecture](https://docs.schuly.dev/SchulyKeycloak/architecture) | How the theme, realm, and base image compose. |
| [Realm management](https://docs.schuly.dev/SchulyKeycloak/realm-management) | Edit and snapshot the `schuly` realm (incl. 2FA). |
| [Account vs privacy mode](https://docs.schuly.dev/SchulyKeycloak/account-vs-privacy-mode) | Which login modes exist and what each stores. |
| [Theme development](https://docs.schuly.dev/SchulyKeycloak/theme-development) | Work on the Keycloakify login theme. |
| [Release](https://docs.schuly.dev/SchulyKeycloak/setup/release) | Cut a release and publish images. |
| [Troubleshooting](https://docs.schuly.dev/SchulyKeycloak/troubleshooting) | Symptoms, causes, and fixes. |
| [Contributing](https://docs.schuly.dev/SchulyKeycloak/contributing) | Workflow, branch and PR conventions. |

## The Schuly ecosystem

| Repo | Purpose |
|---|---|
| [**Schuly**](https://github.com/schulydev/Schuly) | Flutter mobile app |
| [**SchulyBackend**](https://github.com/schulydev/SchulyBackend) | ASP.NET Core API backend |
| [**SchulyKeycloak**](https://github.com/schulydev/SchulyKeycloak) | Keycloak image + the `schuly` realm *(this repo)* |
| [**SchulyPluginAbstractions**](https://github.com/schulydev/SchulyPluginAbstractions) | Plugin contract (NuGet) |
| [**SchulyPlugins**](https://github.com/schulydev/SchulyPlugins) | Official plugins monorepo |
| [**SchulyWebsite**](https://github.com/schulydev/SchulyWebsite) | Landing site ([schuly.dev](https://schuly.dev)) |
| [**SchulyDocs**](https://github.com/schulydev/SchulyDocs) | Documentation site ([docs.schuly.dev](https://docs.schuly.dev)) |
