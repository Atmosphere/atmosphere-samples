WebSockets Example
==================
Demonstrates setting up a websockets server.  Clients can connect using the url ws://localhost:8080/stream
and will receive a stream of string/JSON messages once per second.

There is also a sample client which can be accessed at http://localhost:8080

Launch
======
$ mvn jetty:run 