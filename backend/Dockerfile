# Bước 1: Build (Sử dụng Maven và JDK 17)
FROM maven:4.0.0-openjdk-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Bước 2: Run (Chạy file .jar)
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]