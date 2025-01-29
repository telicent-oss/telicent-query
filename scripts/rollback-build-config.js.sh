#!/usr/bin/env bash
set -e
CONFIG_FILE="env-config.js"
CONFIG="./env-config.js";
PUBLIC_CONFIG_FILE="./public/$CONFIG_FILE"
BKP_CONFIG_FILE="$CONFIG.bkp"

if [[ -f "$PUBLIC_CONFIG_FILE" && -f $BKP_CONFIG_FILE ]]; then 
    mv "$BKP_CONFIG_FILE" "$PUBLIC_CONFIG_FILE"
fi

