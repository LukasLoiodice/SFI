#!/bin/bash

source ./env.sh

./pgsql/deploy.sh
./mongodb/deploy.sh
./backend/deploy.sh
./frontend/deploy.sh
./prometheus/deploy.sh
./grafana/deploy.sh