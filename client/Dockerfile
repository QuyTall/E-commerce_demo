# Bước 1: Build React App
FROM node:21-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Bước 2: Serve bằng Nginx (Nhẹ và nhanh)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Cấu hình Nginx để React Router hoạt động (tránh lỗi 404 khi F5)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]