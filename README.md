# SchulyKeycloak

[![Release](https://img.shields.io/github/v/release/schulydev/SchulyKeycloak)](https://github.com/schulydev/SchulyKeycloak/releases)
[![Build & publish](https://github.com/schulydev/SchulyKeycloak/actions/workflows/docker-publish-release.yaml/badge.svg)](https://github.com/schulydev/SchulyKeycloak/actions/workflows/docker-publish-release.yaml)

Schuly's own [Keycloak](https://www.keycloak.org/) image — the production identity
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
[Self-hosting the full stack](docs/setup/self-hosting.md).

## Documentation

Full docs live in [`docs/`](docs/README.md) (and at
[docs.schuly.dev](https://docs.schuly.dev)):

| Doc | What it covers |
|---|---|
| [Development setup](docs/setup/development.md) | Run the image locally with Docker Compose. |
| [Self-hosting](docs/setup/self-hosting.md) | Deploy the full stack for production. |
| [Configuration reference](docs/configuration.md) | Every port, environment variable, and default. |
| [Architecture](docs/architecture.md) | How the theme, realm, and base image compose. |
| [Realm management](docs/realm-management.md) | Edit and snapshot the `schuly` realm (incl. 2FA). |
| [Theme development](docs/theme-development.md) | Work on the Keycloakify login theme. |
| [Release](docs/setup/release.md) | Cut a release and publish images. |
| [Troubleshooting](docs/troubleshooting.md) | Symptoms, causes, and fixes. |

## Contributing

Issue → branch → PR → squash-merge. See [Contributing](docs/contributing.md).
