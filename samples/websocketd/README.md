### Running Atmosphere on top of [Websocketd](https://github.com/joewalnes/websocketd)

To run Atmosphere on top of Websocketd, the easiest way is to package your .class and Atmosphere's dependencies inside a single jar file.
See [this](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocketd/pom.xml) for an example and make sure the created jar contains a manifest main class entry.

To bootstrap websocketd, write a class with this line:
```java
new EmbeddedWebSocketHandler(new AtmosphereFramework()).requestURI("/chat").on().serve(System.in);
```

To run this sample, make sure you have a file called [atmosphere.sh](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocketd/atmosphere.sh)
```js
java -jar target/atmosphere-websocketd-2.1.0-SNAPSHOT-process.jar
```


And then just do:
```bash
websocketd --staticdir=src/main/webapp/ --port=8080 ./atmosphere.sh
```

Then the following Atmosphere's WebSocket Application will runs like a charm with websocketd or ANY WebSocket Server!

```java
 @WebSocketHandlerService(path = "/chat", broadcaster = SimpleBroadcaster.class,
         atmosphereConfig = {"org.atmosphere.websocket.WebSocketProtocol=
                     org.atmosphere.websocket.protocol.StreamingHttpProtocol"})
 public class WebSocketdChat extends WebSocketStreamingHandlerAdapter {
     private final Logger logger = LoggerFactory.getLogger(WebSocketdChat.class);
     private final ObjectMapper mapper = new ObjectMapper();

     @Override
     public void onOpen(WebSocket webSocket) throws IOException {
         webSocket.resource().addEventListener(new WebSocketEventListenerAdapter() {
             @Override
             public void onDisconnect(AtmosphereResourceEvent event) {
                 if (event.isCancelled()) {
                     logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
                 } else if (event.isClosedByClient()) {
                     logger.info("Browser {} closed the connection", event.getResource().uuid());
                 }
             }
         }).suspend();
     }

     public void onTextStream(WebSocket webSocket, Reader reader) throws IOException {
         webSocket.broadcast(mapper.writeValueAsString(mapper.readValue(new BufferedReader(reader).readLine(), Data.class)));
     }
 }
```

Client side will consist of:

```js
 $(function () {
     "use strict";

     var detect = $('#detect');
     var header = $('#header');
     var content = $('#content');
     var input = $('#input');
     var status = $('#status');
     var myName = false;
     var author = null;
     var logged = false;
     var socket = $.atmosphere;

     // We are now ready to cut the request
     var request = { url: document.location.toString() + 'chat',
         contentType : "application/json",
         enableProtocol : false,
         transport : 'websocket'};

     request.onOpen = function(response) {
         content.html($('<p>', { text: 'Atmosphere connected using ' + response.transport }));
         input.removeAttr('disabled').focus();
         status.text('Choose name:');
     };

     request.onMessage = function (response) {
         var message = response.responseBody;
         try {
             var json = jQuery.parseJSON(message);
         } catch (e) {
             console.log('This doesn\'t look like a valid JSON: ', message);
             return;
         }

         input.removeAttr('disabled').focus();
         if (!logged && myName) {
             status.text(myName + ': ').css('color', 'blue');
             input.removeAttr('disabled').focus();
             logged = true;
         } else {
             var me = json.author == author;
             var date = typeof(json.time) == 'string' ? parseInt(json.time) : json.time;
             addMessage(json.author, json.message, me ? 'blue' : 'black', new Date(date));
         }
     };

     request.onClose = function(response) {
         logged = false;
     }

     request.onError = function(response) {
         content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
             + 'socket or the server is down' }));
     };

     var subSocket = socket.subscribe(request);

     input.keydown(function(e) {
         if (e.keyCode === 13) {
             var msg = $(this).val();

             // First message is always the author's name
             if (author == null) {
                 author = msg;
             }

             subSocket.push(jQuery.stringifyJSON({ author: author, message: msg }));
             $(this).val('');

             input.attr('disabled', 'disabled');
             if (myName === false) {
                 myName = msg;
             }
         }
     });

     function addMessage(author, message, color, datetime) {
         content.append('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()) + ':'
             + (datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes())
             + ': ' + message + '</p>');
     }
 });
```

