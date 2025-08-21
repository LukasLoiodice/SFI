#!/bin/bash

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_PATH

# build docker image
eval $(minikube docker-env)
docker build --build-arg VITE_BACKEND_URL=http://127.0.0.1:8000 -t frontend:local ../../frontend

# apply deployment
kubectl apply -f ./deployment.yaml

# apply service
kubectl apply -f ./service.yaml