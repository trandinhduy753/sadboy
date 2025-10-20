FROM nginx:alpine

# Copy dist build sẵn từ local
COPY dist/ /usr/share/nginx/html

# Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
