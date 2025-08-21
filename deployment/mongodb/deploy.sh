#!/bin/bash
(envsubst < ./values.yaml) | helm upgrade --install mongodb bitnami/mongodb -f -