#!/bin/bash
docker volume create mongodb-data
docker run --detach \
    --hostname mongodb \
    --name mongodb \
    --restart always \
    --publish 27017:27017 \
    --volume mongodb-data:/data/db \
    mongo:latest