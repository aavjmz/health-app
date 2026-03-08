FROM nginx:alpine
COPY index.html report.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
