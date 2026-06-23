# syntax=docker/dockerfile:1

# Schuly's own Keycloak image. Same recipe as the Polyglot-App keycloak/ folder:
# a Keycloakify login theme baked in as a provider jar, a leaked-password
# blacklist, plus the Schuly realm baked in so the prod image is self-contained.
# The final image is an *optimized* build (`kc.sh build`) for fast prod startup.

# ---- Stage 1: build the Keycloakify login theme into a provider jar ----------
FROM node:22-bookworm AS theme
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*
WORKDIR /build
COPY keycloakify/package*.json ./
RUN npm install
COPY keycloakify/ .
RUN npm run build-keycloak-theme

# ---- Stage 2: leaked-password blacklist (rockyou) ----------------------------
FROM debian:bookworm-slim AS blacklist
RUN apt-get update \
 && apt-get install -y curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL -o /rockyou.tar.gz \
      https://github.com/danielmiessler/SecLists/raw/master/Passwords/Leaked-Databases/rockyou.txt.tar.gz \
 && tar -xzf /rockyou.tar.gz -C / \
 && iconv -f utf-8 -t utf-8 -c /rockyou.txt -o /rockyou-utf8.txt

# ---- Stage 3: optimized Keycloak builder -------------------------------------
FROM quay.io/keycloak/keycloak:26.6 AS builder
ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
COPY --from=theme /build/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar \
     /opt/keycloak/providers/schuly-keycloak-theme.jar
RUN /opt/keycloak/bin/kc.sh build

# ---- Stage 4: final runtime image --------------------------------------------
FROM quay.io/keycloak/keycloak:26.6
COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY --from=blacklist /rockyou-utf8.txt /opt/keycloak/password-blacklists/rockyou.txt
COPY realms/ /opt/keycloak/data/import/
ENV JAVA_OPTS_APPEND="-Dkeycloak.password.blacklists.path=/opt/keycloak/password-blacklists"
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized", "--import-realm"]
