# Multi-stage build
# Build stage
FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /shelfSyncBE

# Copy the Firebase JSON file into the build context
COPY ./src/main/resources/shelfsync-318c6-firebase-adminsdk-tsl99-82a3b2dfc0.json ./src/main/resources/
COPY . .
RUN mvn clean install

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /shelfSyncBE

# Copy the Firebase JSON file from the build context (builder stage) into the container
COPY --from=builder /shelfSyncBE/src/main/resources/shelfsync-318c6-firebase-adminsdk-tsl99-82a3b2dfc0.json ./src/main/resources/
COPY --from=builder /shelfSyncBE/target/shelfSyncBE-0.0.1-SNAPSHOT.jar ./application.jar

# Run the Spring Boot application
CMD ["java", "-jar", "application.jar"]