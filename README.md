The table below describes every Atmosphere's sample by defining the server and client API used to build it. You can download the sample by clicking on its name or clone the workspace, build it and then do
```bash
  mvn jetty:run
```

Recommended samples for getting started are the chat, which demonstrate usage of all transports using an AtmosphereHandler, or the jquery-pubsub, which demonstrate how to switch from one transport to another using a Jersey Resources. If you are interested to write WebSocket only application, take a look at the atmosphere-websockethandler-pubsub sample. The pubsub sample contains a lot of small demonstration on how the Jersey extension can be used. If you are interested to write HTML5 Server Side Events application, take a look at the atmosphere-sse-xxx samples.

If you plan to use Spring or GWT, take a look at their specific samples.

<font color="green">**All sample supports WebSocket and Long Polling by default. Streaming and JSONP are supported by the majority of pubsub samples. If you are interested to write HTML5 Server Side Events application, take a look at the atmosphere-sse-xxx samples.**</font>
<table width=100% height=100%>
    <tr>
        <td>Sample Name</td>
        <td>Description</td>
        <td>Server Components</td>
        <td>Client Components</td>
    </tr>
    <tr>
        <td>[all-api-pubsub](http://search.maven.org/#artifactdetails%7Corg.atmosphere.samples%7Catmosphere-all-api-pubsub%7C0.9.4%7Cwar)</td>
        <td>This sample implements a pubsub example that demonstrates all Atmosphere's API and extension. The use of AtmosphereResource, Meteor, Annotation like @Suspend and @Broadcast are demonstrated</td>
        <td>[AtmosphereHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/all-api-pubsub/src/main/scala/org/atmosphere/samples/pubsub/websocket/AtmosphereHandler.scala) [Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/all-api-pubsub/src/main/scala/org/atmosphere/samples/pubsub/websocket/Resource.scala) [Meteor](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/all-api-pubsub/src/main/scala/org/atmosphere/samples/pubsub/websocket/Meteor.scala) [WebSocketProtocol](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/all-api-pubsub/src/main/scala/org/atmosphere/samples/pubsub/websocket/DevoxxWebSocketProtocol.scala)</td>
        <td>Single [Callback](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/all-api-pubsub/src/main/webapp/index.html) supporting WebSocket, Long-Polling, JSONP, Http-Streaming </td>
    </tr>
        <td>[async-annotation-pubsub](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-async-channel%22)</td>
        <td>This sample demonstrates the use of the @Asynchronous annotation combined with the Callable<?> API, showing how an application can be fully asynchronous in its execution. The sample implements the pubsub concepts.</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/async-annotation-pubsub/src/main/java/org/atmosphere/samples/pubsub/AsynchronousExecution.java) </td>
        <td>Single [Callback](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/async-annotation-pubsub/src/main/webapp/index.html#L36) supporting WebSocket, Long-Polling, JSONP, Http-Streaming </td>
    </tr>
    <tr>
        <td>[atmosphere-ee6](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-ee6%22)</td>
        <td>This sample demonstrates the use of @Suspend with Java EE's 6 annotation like @Resource and EJB Timer</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/atmosphere-ee6/src/main/java/org/jersey/devoxx/samples/ee6/atmosphere/TimerResource.java)</td>
        <td>Http-Streaming</td>
    </tr>
    <tr>
        <td>[channel](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-channel%22)</td>
        <td>This sample demonstrate the use of @Subscribe and @Publish annotation using a pub sub application. If you are migrating from CometD, this sample is for you.</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/channel/src/main/java/org/atmosphere/samples/pubsub/TypedChannel.java)</td>
        <td></td>
    </tr>
    <tr>
        <td>[chat-guice](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-guice-chat%22)</td>
        <td>This sample demonstrate the use of Google Guice with Atmosphere. The Chat application is implemented using @Suspend and @Broadcast annotation</td>
        <td>[Guice](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/guice/chat-guice/src/main/java/org/atmosphere/samples/guice/GuiceChatModule.java) [Jersey Resource](https://github.com/Atmosphere/atmosphere-extensions/blob/master/guice/samples/chat-guice/src/main/java/org/atmosphere/samples/guice/ResourceChat.java#L31)</td>
        <td>Javascript Functions demonstrating [WebSocket, falling back to Long-Polling](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/guice/chat-guice/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[chat](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-chat%22)</td>
        <td>This sample demonstrates the use of WebSocket (falling back to SSE and Long-Polling) using the [@ManagedService](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/service/ManagedService.html) annotation. The sample also demonstrates how to detect which transport are supported by the client and server by negotiating with the server.</td>
        <td>[Chat](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/chat/src/main/java/org/atmosphere/samples/chat/Chat.java)</td>
        <td>Javascript Functions demonstrating [WebSocket, falling back to Long-Polling](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/chat/src/main/webapp/javascript/application.js). This is the recommended sample to start with.</td>
    </tr>
        <tr>
            <td>[chat-multiroom](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-chat-multiroom%22)</td>
            <td>This sample demonstrates the use of WebSocket (falling back SSE and to Long-Polling) using the [@ManagedService](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/service/ManagedService.html) annotation with [Encoder](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/managed/Encoder.html) and [Decoder](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/managed/Decoder.html). The sample also demonstrates how to detect which transport are supported by the client and server by negotiating with the server.</td>
            <td>[Chatroom](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/chat-multiroom/src/main/java/org/atmosphere/samples/chat/ChatRoom.java)</td>
            <td>Javascript Functions demonstrating [WebSocket, falling back to Long-Polling](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/chat/src/main/webapp/javascript/application.js). This is the recommended sample to start with.</td>
        </tr>
    <tr>
        <td>[di-guice-sample](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-di-guice-sample%22)</td>
        <td>The sample demonstrates the use of Atmosphere's Dependencies Injection using Guice</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/guice/di-guice-sample/src/main/java/org/atmosphere/samples/di/guice/MessageResource.java) [Guice](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/di-guice-sample/src/main/java/org/atmosphere/samples/di/guice/GuiceContextListener.java)</td>
        <td>[Javascript Callback](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/guice/di-guice-sample/src/main/webapp/index.html#L46)</td>
    </tr>
    <tr>
        <td>[jersey2-chat](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22atmosphere-jersey2-chat%22)</td>
        <td>This samples demonstrates the use of JAX RS Specification 2 with [@AtmosphereService](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/service/AtmosphereService.html)</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jersey2-chat/src/main/java/org/atmosphere/samples/chat/jersey/Jersey2Resource.java)</td>
        <td>Javascript Functions demonstrating [WebSocket, falling back to Long-Polling](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jersey2-chat/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[atmospherehandler-pubsub](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-atmospherehandler-pubsub%22)</td>
        <td>This sample demonstrate the use of AtmosphereHandler for implementing a pub sub application. The sample supports Long-Polling, Http Streaming and WebSocket</td>
        <td>[AtmosphereHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/atmospherehandler-pubsub/src/main/java/org/atmosphere/samples/pubsub/AtmosphereHandlerPubSub.java#L39)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/atmospherehandler-pubsub/src/main/webapp/index.html)</td>
    </tr>
    <tr>
        <td>[atmosphere-meteor-pubsub](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-meteor-pubsub%22)</td>
        <td>This sample demonstrate the use of the Meteor API, from a Servlet, for implementing a pub sub application. The sample supports Long-Polling, Http Streaming and WebSocket</td>
        <td>[Meteor](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-meteor-pubsub/src/main/java/org/atmosphere/samples/pubsub/MeteorPubSub.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-meteor-pubsub/src/main/webapp/index.html#L8)</td>
    </tr>
    <tr>
        <td>[jquery-multirequest](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-multirequest%22)</td>
        <td>This sample demonstrates how multi requests can be made using the jQuery.atmosphere.js. The sample implements the pub sub application.</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-multirequest/src/main/java/org/atmosphere/samples/multirequest/handlers/Subscriber.java#L33)/td>
        <td>[Per Request and Global callback](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-multirequest/src/main/webapp/js/main.js)</td>
    </tr>
    <tr>
        <td>[jquery-pubsub](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-jquery-pubsub%22)</td>
        <td>This sample demonstrates all transports (WebSockets, Server Side Events, Long-Polling, Http Streaming and JSONP using a super simple Jersey Resource. The sample implements a pub sub application.</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-pubsub/src/main/java/org/atmosphere/samples/pubsub/JQueryPubSub.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-pubsub/src/main/webapp/index.html)</td>
    </tr>
    <tr>
        <td>[jquery-websockethandler-pubsub](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-websockethandler-pubsub%22)</td>
        <td>This sample demonstrates how to write WebSocket only application</td>
        <td>[WebSocketHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-websockethandler-pubsub/src/main/java/org/atmosphere/samples/pubsub/WebSocketPubSub.java#L36)</td>
        <td>[Javascript Funtion](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/jquery-websockethandler-pubsub/src/main/webapp/index.html#L36)</td>
    </tr>
    <tr>
        <td>[jquery-pubsub](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-pubsub%22)</td>
        <td>This sample demonstrates a lot of server side functionality like broadcast/suspend/resume using a Jersey Resource.</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/pubsub/src/main/java/org/atmosphere/samples/pubsub/PubSub.java)</td>
        <td></td>
    </tr>
        <tr>
            <td>[meteor-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-meteor-chat%22)</td>
            <td>This sample demonstrates of the Meteor API, from a Servlet, can be used to implement a chat application</td>
            <td>[Meteor](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/meteor-chat/src/main/java/org/atmosphere/samples/chat/MeteorChat.java)</td>
            <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/meteor-chat/src/main/webapp/jquery/application.js)</td>
        </tr>
    <tr>
        <td>[meteor-pubsub](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-meteor-pubsub%22)</td>
        <td>This sample demonstrates of the Meteor API, from a Servlet, can be used to implement a chat application</td>
        <td>[Meteor](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/meteor-pubsub/src/main/java/org/atmosphere/samples/chat/MeteorPubSub.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/meteor-pubsub/src/main/webapp/index.html)</td>
    </tr>
    <tr>
        <td>[rest-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-rest-chat%22)</td>
        <td>This sample demonstrates the use of a Jersey Resource for implementing a chat application</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/rest-chat/src/main/java/org/atmosphere/samples/chat/jersey/ResourceChat.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/rest-chat/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[scala-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-scala-chat%22)</td>
        <td>This sample demonstrates how to use Scala to write a chat application</td>
        <td>[Scala Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/scala-chat/src/main/scala/org/atmosphere/samples/scala/chat/ScalaChat.scala)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/scala-chat/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[spring-tiles](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-spring-tiles%22)</td>
        <td>This sample demonstrates how to use the Spring and Tiles Framework with AtmosphereHandler. The sample implements a pubsub application</td>
        <td>[Spring Controller](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/spring/spring-tiles/src/main/java/org/atmosphere/samples/pubsub/spring/PubSubController.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/spring/spring-tiles/src/main/webapp/pages/pubsubHeader.jsp#L6)</td>
    </tr>
    <tr>
        <td>[spring-websocket](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-spring-websocket%22)</td>
        <td>This sample demonstrates the use of Spring with Atmosphere WebSocketHandler, Meteor and AtmosphereHandler</td>
        <td>[Meteor](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/spring/spring-websocket/src/main/java/org/atmosphere/samples/pubsub/utils/AtmosphereUtils.java#L31) [Service](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/spring-websocket/src/main/java/org/atmosphere/samples/pubsub/services/ChatService.java) [WebSocketProtocol](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/spring-websocket/src/main/java/org/atmosphere/samples/pubsub/config/protocol/DelegatingWebSocketProtocol.java)</td>
        <td>[Spring View](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/spring/spring-websocket/src/main/webapp/WEB-INF/views/home.jsp#L9)</td>
    </tr>
    <tr>
        <td>[sse-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-chat-sse%22)</td>
        <td>This sample demonstrates how to use HTML 5 Server Sides Events to build a chat application using an AtmosphereHandler</td>
        <td>[AtmosphereHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/sse-chat/src/main/java/org/atmosphere/samples/chat/ChatAtmosphereHandler.java)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/sse-chat/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[sse-rest-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-sse-rest-chat%22)</td>
        <td>This sample demonstrates how to use HTML 5 Server Sides Events to build a chat application using a Jersey Resource</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/sse-rest-chat/src/main/java/org/atmosphere/samples/chat/jersey/ResourceChat.java#L33)</td>
        <td>[Javascript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/sse-rest-chat/src/main/webapp/jquery/application.js)</td>
    </tr>
    <tr>
        <td>[twitter-live-feed](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-twitter-live-feed%22)</td>
        <td>This sample demonstrates how to use jQuery.atmosphere.js to implements a real time Twitter Search using a simple Jersey Resource. It also demonstrate how BroadcastFilter can be used to mark to handle large set of data to send back to the client</td>
        <td>[Jersey Resource](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/twitter-live-feed/src/main/java/org/atmosphere/samples/twitter/TwitterFeed.java#L48)</td>
        <td>[JavaScript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/twitter-live-feed/src/main/webapp/index.html#L34)</td>
    </tr>
    <tr>
        <td>[socketio-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-socketio%22)</td>
        <td>This sample demonstrates how the SocketIO library can be used, trsnaparently, using an AtmosphereHandler</td>
        <td>[AtmosphereHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/socketio/socketio-chat/src/main/java/org/atmosphere/samples/chat/SocketIOChatAtmosphere.java)</td>
        <td>[SocketIO](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/socketio/socketio-chat/src/main/webapp/javascript/application.js#L1)</td>
    </tr>
    </tr>
        <tr>
        <td>[native-socketio-chat](http://search.maven.org/#search|gav|1|g%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-socketio%22)</td>
        <td>This sample demonstrates how the SocketIO library and natively extending the SocketIO protocol on the server side</td>
        <td>[AtmosphereHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/socketio/native-socketio-chat/src/main/java/org/atmosphere/samples/chat/ChatAtmosphereHandler.java)</td>
        <td>[SocketIO](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/socketio/native-socketio-chat/src/main/webapp/index.html#L1)</td>
    </tr>
    </tr>
        <tr>
        <td>[cometd/bayeux protocol](https://oss.sonatype.org/content/repositories/snapshots/org/atmosphere/samples/atmosphere-cometd-demo/)</td>
        <td>This sample deploy the [Cometd official](http://cometd.org/) demo on top of Atmosphere</td>
        <td></td>
        <td></td>
    </tr>
        <tr>
        <td>[websocket-chat](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-websocket-chat%22)</td>
        <td>This sample demonstrates how to write WebSocket ONLY applications</td>
        <td>[WebSockerHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocket-chat/src/main/java/org/atmosphere/samples/chat/WebSocketChat.java#L33)</td>
        <td>[JavaScript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocket-chat/src/main/webapp/jquery/application.js#L1)</td>
    </tr>
        <tr>
        <td>[websocket-stream](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22atmosphere-websocket-stream%22)</td>
        <td>This sample demonstrates how to write WebSocket streaming applications</td>
        <td>[WebSockerHandler](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocket-stream/src/main/java/org/atmosphere/samples/stream/WebSocketStream.java#L33)</td>
        <td>[JavaScript Function](https://github.com/Atmosphere/atmosphere-samples/blob/master/samples/websocket-stream/src/main/webapp/jquery/application.js#L1)</td>
    </tr>
    </tr>
        <tr>
        <td>[gwt2-jersey-rpc](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22gwt20-jersey-rpc%22)</td>
        <td>GWT RPC with Jersey</td>
        <td>[Server](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-json/src/main/java/org/atmosphere/samples/client/GwtJsonDemo.java)</td>
        <td>[Client](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/qwt20-jersey-rpc/src/main/java/org/atmosphere/samples/client/GwtJerseyDemo.java)</td>
    </tr>
    </tr>
        <tr>
        <td>[gwt20-json](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22gwt20-json%22)</td>
        <td>GWT with JSON</td>
        <td>[Server](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-json/src/main/java/org/atmosphere/samples/server/JerseyGwtRpc.java)</td>
        <td>[Client](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-json/src/main/java/org/atmosphere/samples/client/GwtJsonDemo.java)</td>
    </tr>
     </tr>
         <tr>
         <td>[gwt20-managed-rpc](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22gwt20-json%22)</td>
         <td>GWT RPC using the [@ManagedService](http://atmosphere.github.io/atmosphere/apidocs/org/atmosphere/config/service/ManagedService.html) annotation</td>
         <td>[Server](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-managed-rpc/src/main/java/org/atmosphere/samples/server/ManagedGWTResource.java#L40)</td>
         <td>[Client](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-managed-rpc/src/main/java/org/atmosphere/samples/client/GwtRpcDemo.java#L82)</td>
     </tr>
      </tr>
          <tr>
          <td>[gwt20-rpc](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22gwt20-json%22)</td>
		  <td>GWT RPC using the an AtmosphereHandler</td>
          <td>[Server](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-rpc/src/main/java/org/atmosphere/samples/server/GwtRpcAtmosphereHandler.java)</td>
          <td>[Client](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-websockets/src/main/java/org/atmosphere/samples/client/GwtWebsocketsDemo.java)</td>
      </tr>
          <tr>
          <td>[gwt20-websockets](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.atmosphere.samples%22%20AND%20a%3A%22gwt20-websockets%22)</td>
          <td>GWT client websockets using com.sksamuel.gwt</td>
          <td>[websocket-stream](./samples/websocket-stream)</td>	
          <td>[Client](https://github.com/Atmosphere/atmosphere-samples/blob/master/extensions-samples/gwt/gwt20-websockets/src/main/java/org/atmosphere/samples/client/GwtWebsocketsDemo.java)</td>
      </tr>