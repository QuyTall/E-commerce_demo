# Bước 1: Build (Sử dụng Maven với JDK 21 chuẩn)
# Thay maven:4.0.0-openjdk-21 (không tồn tại) bằng bản ổn định
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Bước 2: Run (Sử dụng JRE 21 nhẹ và chuẩn)
# Thay openjdk:21-jdk-slim (lỗi) bằng eclipse-temurin
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]