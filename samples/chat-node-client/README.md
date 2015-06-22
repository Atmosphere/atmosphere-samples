### Using the sample

Build the sample and then install atmosphere-client support in node.js

Start the server part of the chat or websocket-chat sample program.

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


Note the old npm package atmosphere-client has been migrated to npm package atmosphere.js.
For further information, see https://www.npmjs.com/package/atmosphere.js
