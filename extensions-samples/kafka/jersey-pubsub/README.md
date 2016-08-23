This sample assumes Apache Kafka 
For more information on Kafka, refer to http://kafka.apache.org/documentation.html
If Kafka is running at its default host and port localhost:9092, you will need to adjust
parameter bootstrap.servers in a configuration file specified by the init paramter
org.atmosphere.kafka.propertiesFile.

Run this sample twice with this command lines :
- 1st instance : mvn jetty:run-war -Djetty.port=8080
- 2nd instance : mvn jetty:run-war -Djetty.port=9090

You can use your browser to connect to either http://localhost:8080 or http://localhost:9090 and
observe the messages posted to the same topic are broadcasted to its subscribers.
