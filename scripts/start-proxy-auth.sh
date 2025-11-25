#!/usr/bin/env bash
set -e
yarn prestart;

FF_AUTH_V2=true \
    REACT_DEV_SYSTEM_INTEGRATION_URL="https://apps.system-integration.telicent-sandbox.telicent.live" \
    yarn start
