// Original Chat -> http://martinsikora.com/nodejs-and-websocket-simple-chat-tutorial
// / http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
var webSocketsServerPort = 8080;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
var url = require("url");
var st = require('node-static');

var fileServer = new st.Server('./');
/**
 * Global variables
 */
// list of currently connected clients (users)
var clients = [ ];

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    request.addListener('end', function () {
        var _get = url.parse(request.url, true).query; 
        fileServer.serve(request, response);
    });
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    var userName = false;
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text

            if (userName === false) { // first message sent by user is their name
                // remember user name
                userName = JSON.parse(message.utf8Data).author;
                console.log((new Date()) + ' User is known as: ' + userName);

            } else { // log and broadcast the message
                console.log((new Date()) + ' Received Message from '
                    + userName + ': ' + message.utf8Data);

            }

            // broadcast message to all connected clients
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(message.utf8Data);
            }
        }
    });

    // user disconnected
    connection.on('close', function(connection) {
        if (userName !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
        }
    });

});
