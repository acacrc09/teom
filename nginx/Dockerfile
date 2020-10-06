FROM nginx:alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

COPY ./default.conf /etc/nginx/conf.d

RUN chmod +x /wait

EXPOSE 80 443

ENTRYPOINT /wait && nginx -g "daemon off;"