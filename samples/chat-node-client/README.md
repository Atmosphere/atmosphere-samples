### Using the sample

Build the sample and then install atmosphere-client support in node.js

Several samples can be used with this client as they use the same operation.

For example, to use websocket-chat, start the server part of the websocket-chat sample program.

At a console, execute the following shell commands to start the websocket-chat sample program.

```bash
% cd ../websocket-chat
% mvn jetty:run
```

Open http://localhost:8080/ using your Browser for the first chat user.

Start this client for another chat user.

At another console, execute the following shell commands.

```bash
% cd src/main/resources
% npm install atmosphere.js
% node chat-client.js
```

This chat-client program supports websocket, sse, and long-polling and allows
you to select your preferred protocol.

Note the old npm package atmosphere-client has been migrated to npm package atmosphere.js.
For further information, see https://www.npmjs.com/package/atmosphere.js

#### How to use this client for various atmosphere samples


For samples/chat, samples/cxf-chat, samples/websocket-chat,

```bash
% node chat-client.js
```

For samples/cxf-chat-osgi,

```bash
% node chat-client.js http://localhost:8181/atmosphere-cxf-chat/chat
```

  




