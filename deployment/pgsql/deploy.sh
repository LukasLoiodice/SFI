#!/bin/bash
(envsubst < ./values.yaml) | helm upgrade --install postgres bitnami/postgresql -f -