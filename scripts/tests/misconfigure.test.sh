#!/bin/sh
set -e

echo "Running trivy misconfiguration scan"
  trivy config \
    --format table \
    --exit-code 1 \
    --severity HIGH,CRITICAL \
    Dockerfile

