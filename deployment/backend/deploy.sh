#!/bin/sh

# build docker image
eval $(minikube docker-env)
docker build -t backend:local ../../backend

# apply secret and subst env variable
(envsubst < ./secrets.yaml) | kubectl apply -f -

# apply configmap
kubectl apply -f ./configMap.yaml

# apply deployment
kubectl apply -f ./deployment.yaml

# apply service
kubectl apply -f ./service.yaml