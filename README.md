# Smart Factory Inspector (SFI)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation & Running](#installation--running)
   - [Local / Manual Setup (Most Complex)](#local--manual-setup-most-complex)
   - [Run with Docker Compose](#run-with-docker-compose)
   - [Run with Minikube](#run-with-minikube)
   - [Deployment on GKE](#deployment-on-gke)
5. [Contact](#contact)


## Introduction

**Smart Factory Inspector** is a full-stack web application simulating an industrial platform for tracking and inspecting mechanical parts.
The main goal of this project is **educational**: to learn how to **build a complete end-to-end web application** with a backend, frontend, relational and NoSQL databases, and Kubernetes deployment (Minikube and GKE).

As of 23/08/2025, the project is hosted on GKE using the free tier. Please note that the following link may become unavailable if the free credits expire or the deadline is exceeded: https://sfi-app.com/.

To test the application in any deployment (except GKE), a default admin account is provided:
```
username: admin@example.com
password: 123
```

### ⚠️Disclaimers⚠️:
* Some decisions were simplified to facilitate local development and learning (e.g., storing 3D files in MongoDB instead of a cloud bucket, exposing secrets for Minikube and local testing). In a real project, these secrets would never be exposed, as demonstrated with the GKE deployment.
* There are still opportunities to improve the backend, frontend, and security, particularly regarding code quality (refactoring and documentation). I am aware of these areas. The primary goal of this project was to implement features quickly rather than deliver a fully polished product.
* This project is primarily a lab for experimenting with a modern cloud-native stack.
---

## Features
* User management and roles (admin, inspector, operator, user) with JWT authentication and refresh tokens.
* Two CRUD APIs with strong relationships: Product and Item.
* APIs to upload and download 3D files (.glb) stored in MongoDB (in a real project, a cloud bucket would be used). 3D object visualization with Three.js.
* Reactive frontend tightly coupled with the backend.
* Cloud-native architecture ready for Minikube and GKE. Deployment on GCP includes features such as TLS, load balancing, and more, using the free tier. A domain name has been registered via Cloudflare https://sfi-app.com/.
---

## Tech Stack

| Component     | Technology                                                         |
| ------------- | ------------------------------------------------------------------ |
| Frontend      | React.js + TypeScript + TailwindCSS + Vite + zustand + Three.js |
| Backend       | Poetry + Python + FastAPI + Alembic + SqlAlchemy (async) + PyMongo (async) |
| DB | Relational: PostgreSQL + NoSQL: MongoDB |
| Deployment    | Docker + Docker compose + Kubernetes (Minikube, GKE) + Helm chart |

---

## Installation & Running

### Local / Manual Setup (Most Complex)

This setup is the least straightforward, as you need to first configure the `.env` files in both the frontend and backend. You can refer to the deployment manifests to see the expected configuration.

1. Clone the repository:

```bash
git clone https://github.com/LukasLoiodice/SFI.git
cd SFI
```

2. Install backend dependencies (using poetry):

```bash
cd backend
poetry install
poetry shell
```

3. Run and setup the databases

```bash
docker compose up -d
alembic upgrade head
```

4. Start the backend:

```bash
cd src
fastapi dev main.py
```

5. Start the frontend:

```bash
cd ../frontend
npm install
npm run dev
```
---

### Run with docker compose

1. Clone the repository:

```bash
git clone https://github.com/LukasLoiodice/SFI.git
cd SFI
```

2. Launch all the containers

```bash
cd ./local
docker compose up -d
```

The app is accessible through http://localhost.

3. Cleanup
```bash
docker compose down -v
```

---

### Run with minikube

1. Clone the repository:

```bash
git clone https://github.com/LukasLoiodice/SFI.git
cd SFI
```

2. Start minikube:
```bash
minikube start
```

3. Deploy all components (requires `kubectl` and `helm`):
```bash
cd deployment
source ./env.sh
./deploy.sh
```

4. Set up Minikube load balancers:
```bash
minikube tunnel
```

The app is accessible through http://localhost.

5. Cleanup
```bash
minikube delete
```

---

### Deployment on GKE

You can access the application at: https://sfi-app.com/.

The GKE deployment is very similar to the Minikube setup, except that the secrets are, of course, different.

Also, load balancers are not exposed for the frontend and backend services, they are defined as ClusterIP. An Ingress is used to route requests to the services through a GCP-hosted load balancer, which also manages TLS certificates. All Docker images are stored in the GCP Container Registry.

---

## Contact

* Lukas Loiodice / lukasloiodic@gmail.com / https://github.com/LukasLoiodice