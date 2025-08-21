#!/bin/bash
SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_PATH

(envsubst < ./values.yaml) | helm upgrade --install postgres bitnami/postgresql -f -