FROM nginx:1.22.1-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
EXPOSE 8443
CMD ["nginx", "-g", "daemon off;"]