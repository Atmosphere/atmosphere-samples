Spring Boot Atmosphere Sample
==================
Demonstrates setting up Atmosphere with Spring-Boot.
Clients can connect using the url ws://localhost:8080/chat


There is also a sample client which can be accessed at [http://localhost:8080/home.html](http://localhost:8080/)
Alternatively, you can use the client at samples/chat-node-client as well.

Launch for debug on port 9009
======
$ mvn spring-boot:run

Launch as Spring boot jar
======
$ mvn clean package

$ java -jar target/spring-boot-sample-atmosphere.war

Deploy to standalone servlet container
======
$ mvn clean package

$ cp target/spring-boot-sample-atmosphere.war.original $WEBAPPSDROPINFOLDER$/spring-boot-sample-atmosphere.war

Access via the following URL:

[http://localhost:8080/spring-boot-sample-atmosphere/](http://localhost:8080/spring-boot-sample-atmosphere/)