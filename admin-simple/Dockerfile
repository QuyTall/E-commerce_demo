# Tương tự Client
FROM node:21-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Sửa lỗi openssl cho node mới nếu cần
ENV NODE_OPTIONS=--openssl-legacy-provider 
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
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