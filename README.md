# SchulyKeycloak

Schuly's own [Keycloak](https://www.keycloak.org/) image — the production identity provider
for Schuly. A release builds and pushes a multi-arch container to
`ghcr.io/schulydev/schulykeycloak`.

The recipe follows the `keycloak/` setup in
[Polyglot-App](https://github.com/PianoNic/Polyglot-App): a Keycloakify login theme baked in
as a provider jar, a leaked-password blacklist, and the Schuly realm baked in.

## Layout
- `Dockerfile` — multi-stage: theme jar + rockyou blacklist + optimized keycloak 26.6.
- `keycloakify/` — branded login theme (Keycloakify), ported from Polyglot-App.
- `realms/schuly-realm.json` — the `schuly` realm, imported on first start.
- `compose.dev.yml` — local dev (`start-dev --import-realm`, admin/admin on :8080).
- `scripts/keycloak-export.{sh,ps1,bat}` — round-trip realm edits back into `realms/`.
- `.github/workflows/docker-publish-release.yaml` — build + push on release.
- `application.properties` — version, synced from the release tag by CI.

## Develop locally
    docker compose -f compose.dev.yml up --build
    # http://localhost:8080  (admin / admin); realm `schuly` imported automatically
Edit the realm in the console, then snapshot it back: `./scripts/keycloak-export.sh`.

## Production
    docker run -p 8080:8080 \
      -e KC_DB_URL=jdbc:postgresql://db:5432/keycloak \
      -e KC_DB_USERNAME=keycloak -e KC_DB_PASSWORD=... \
      -e KC_HOSTNAME=https://auth.schuly.dev \
      -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=... \
      ghcr.io/schulydev/schulykeycloak:latest

## Release
Cut a GitHub release; the workflow syncs `application.properties` to the tag and pushes
`:<semver>` (+ `:latest`, `:<major>`, `:<major>.<minor>`). Needs repo secret `MAIN_PUSH_TOKEN`
(and optionally `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`).
