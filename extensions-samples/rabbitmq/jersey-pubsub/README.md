This sample assumes RabbitMQ is running on localhost at default port 5672.
For more information on RabbitMQ, refer to http://www.rabbitmq.com/download.html
If RabbitMQ is running on a different host or at port, you will need to adjust the connection
parameters in web.xml.

Run this sample twice with this command lines :
- 1st instance : mvn jetty:run -Djetty.port=8080
- 2nd instance : mvn jetty:run -Djetty.port=9090

You can use your browser to connect to either http://localhost:8080 or http://localhost:9090 and
observe the messages posted to the same topic are broadcasted to its subscribers.
