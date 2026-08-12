#!/usr/bin/env bash
# Resolve ${env.VAR} placeholders in the realm import files from the container's
# environment BEFORE Keycloak imports them. Keycloak's realm import does not
# substitute environment variables itself (only ${vault.x}, at use-time), so the
# committed realm keeps clean ${env.*} placeholders and this script fills them in
# at startup from the values passed to the container (e.g. SMTP creds).
# Non-env placeholders like ${username}/${email} are left untouched.
set -euo pipefail

# An unset placeholder resolves to an empty string, and Keycloak refuses to start
# when the realm's SMTP sender is empty ("Invalid sender address ''"), so give the
# sender a valid fallback. Mail is only actually delivered once SMTP_HOST and the
# rest are set as well.
: "${SMTP_FROM:=noreply@localhost}"

import_dir="/opt/keycloak/data/import"
if [ -d "$import_dir" ]; then
    for f in "$import_dir"/*.json; do
        [ -e "$f" ] || continue
        content="$(cat "$f")"
        while [[ "$content" =~ \$\{env\.([A-Za-z_][A-Za-z0-9_]*)\} ]]; do
            var="${BASH_REMATCH[1]}"
            val="${!var-}"
            content="${content//\$\{env.${var}\}/$val}"
        done
        printf '%s' "$content" > "$f"
    done
fi

exec /opt/keycloak/bin/kc.sh "$@"
