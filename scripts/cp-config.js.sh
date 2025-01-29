#!/usr/bin/env bash
set -e

CONFIG="./env-config.js";
if [[ -f "$CONFIG" && -d "./public" ]]; then
    cp "$CONFIG" ./public;
    echo "Copied $CONFIG to ./public";
else
    echo "SKIPPED copy of $CONFIG to ./public";
fi

