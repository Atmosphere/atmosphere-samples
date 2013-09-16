Run this sample twice with this command lines :
- 1st instance : mvn jetty:run-war -Djetty.port=8080 -Dorg.atmosphere.rmi.peer.server1=localhost:4000 -Dorg.atmosphere.rmi.server.port=4001
- 2nd instance : mvn jetty:run-war -Djetty.port=9090 -Dorg.atmosphere.rmi.peer.server1=localhost:4001 -Dorg.atmosphere.rmi.server.port=4000