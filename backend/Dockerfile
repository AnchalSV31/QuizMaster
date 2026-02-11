# Use official OpenJDK image
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy everything
COPY . .

# Build the project
RUN ./mvnw clean install || mvn clean install

# Run the jar
CMD ["java", "-jar", "target/quiz-backend-1.0.0.jar"]