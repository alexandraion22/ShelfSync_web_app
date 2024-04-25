# Build stage
FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /shelfSyncDB
COPY . .
RUN mvn clean install

# Runtime stage
FROM openjdk:17-jdk-slim

WORKDIR /shelfSyncDB
COPY --from=builder /shelfSyncDB/target/shelfSyncDB-0.0.1-SNAPSHOT.jar /shelfSyncDB/application.jar

CMD ["java", "-jar", "application.jar"]