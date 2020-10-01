FROM node:lts-alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

WORKDIR /usr/src/app

COPY . . 

RUN npm install && \
    npm audit fix && \
    chmod +x /wait

EXPOSE 3000

ENTRYPOINT /wait && npm start