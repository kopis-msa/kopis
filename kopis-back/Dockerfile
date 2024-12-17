FROM openjdk:17-alpine
CMD ["./gradlew", "clean", "build"]
ARG JAR_FILE=build/libs/kopis-back-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} kopis-back.jar
ENV PROFILE=docker
ENTRYPOINT ["java","-Dspring.profiles.active=${PROFILE}","-jar","/kopis-back.jar"]
