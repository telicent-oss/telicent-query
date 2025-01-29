FROM nginxinc/nginx-unprivileged:stable-alpine-slim
USER 101

WORKDIR /usr/share/nginx/html/query
COPY ./build /usr/share/nginx/html/query
COPY ./query.sbom.json /opt/telicent/sbom/sbom.json
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./LICENCE /usr/share/nginx/html/query/LICENCE
COPY ./NOTICE  /usr/share/nginx/html/query/NOTICE

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]