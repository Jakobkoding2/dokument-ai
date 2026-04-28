# Dockerfile for DokumentAI
# This is a root convenience Dockerfile depending on whether you want to build a monolithic image or something else.
# However, the docker-compose.yml uses the context-specific Dockerfiles in ./server and ./dashboard respectively.

FROM node:20-alpine

WORKDIR /app
COPY . .

CMD ["echo", "Please use docker-compose up or build server/dashboard separately."]
