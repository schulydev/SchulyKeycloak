$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot  = Split-Path -Parent $ScriptDir
$Compose   = Join-Path $RepoRoot "compose.dev.yml"
$Realms    = Join-Path $RepoRoot "realms"
docker compose -f $Compose stop keycloak
docker compose -f $Compose run --rm -v "${Realms}:/export" keycloak export --dir /export --users skip
docker compose -f $Compose up -d --wait keycloak
