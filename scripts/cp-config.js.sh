#!/usr/bin/env bash
set -e

ENV_CONFIG="./env-config.js"
DEFAULT="./env-config.default.js"

if [[ ! -f "$ENV_CONFIG" && -f "$DEFAULT" ]]; then
  cp "$DEFAULT" "$ENV_CONFIG"
  echo "Bootstrapped $ENV_CONFIG from $DEFAULT"
fi

if [[ -d "./public" ]]; then
  cp "$ENV_CONFIG" ./public
  echo "Copied $ENV_CONFIG to ./public"
fi
