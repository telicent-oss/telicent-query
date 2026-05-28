#!/usr/bin/env bash
set -euo pipefail

ENV_CONFIG="./env-config.js"
TEMPLATE="./env-config.default.js"
CONFLUENCE_URL="https://telicent.atlassian.net/wiki/x/BICSNw"

: "${MAP_TILER_TOKEN:=}"
: "${ARC_GIS_API_TOKEN:=}"
export MAP_TILER_TOKEN ARC_GIS_API_TOKEN

if [[ ! -f "$ENV_CONFIG" && -f "$TEMPLATE" ]]; then
  if ! command -v envsubst >/dev/null 2>&1; then
    echo "error: envsubst not found. Install gettext (e.g. 'brew install gettext')." >&2
    exit 1
  fi

  missing=()
  for var in API_HOST_DOMAIN APP_HOST_DOMAIN AUTH_HOST_DOMAIN; do
    if [[ -z "${!var:-}" ]]; then
      missing+=("$var")
    fi
  done
  if (( ${#missing[@]} > 0 )); then
    echo "error: required env vars unset: ${missing[*]}" >&2
    echo "       see $CONFLUENCE_URL for values." >&2
    exit 1
  fi
  export API_HOST_DOMAIN APP_HOST_DOMAIN AUTH_HOST_DOMAIN

  envsubst '${API_HOST_DOMAIN} ${APP_HOST_DOMAIN} ${AUTH_HOST_DOMAIN} ${MAP_TILER_TOKEN} ${ARC_GIS_API_TOKEN}' \
    < "$TEMPLATE" > "$ENV_CONFIG"
  echo "Bootstrapped $ENV_CONFIG from $TEMPLATE"
fi

if [[ -d "./public" ]]; then
  cp "$ENV_CONFIG" ./public
  echo "Copied $ENV_CONFIG to ./public"
fi
