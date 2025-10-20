# Chọn node
FROM node:20

WORKDIR /app

# Copy package.json + package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build project
RUN npm run build

# Sử dụng nginx để serve frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
