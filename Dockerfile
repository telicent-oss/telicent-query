FROM telicent/telicent-nginx1.27:latest
ARG APP_NAME
USER user
COPY "./$APP_NAME.sbom.json" /opt/telicent/sbom/sbom.json
COPY nginx/ /usr/local/nginx/conf/
COPY build/ /usr/local/nginx/html/
COPY ./LICENCE /usr/local/nginx/html/LICENCE
COPY ./NOTICE  /usr/local/nginx/html/NOTICE

# run
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]