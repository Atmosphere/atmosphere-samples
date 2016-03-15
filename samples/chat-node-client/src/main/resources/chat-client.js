/**
 * chat-client.js
 * 
 * A client program to chat over atmosphare-samples/samples/websocket-chat or
 * atmosphare-samples/samples/chat.
 * 
 * 
 */

"use strict";

var reader = require('readline');
var prompt = reader.createInterface(process.stdin, process.stdout);

var atmosphere = require('atmosphere.js');

var request = { url: 'http://localhost:8080/chat',
                contentType : "application/json",
                transport : 'websocket',
                trackMessageLength: true,
                reconnectInterval : 5000};
var isopen = false;

const TRANSPORT_NAMES = ["websocket", "sse", "long-polling"];

function selectOption(c, opts) {
    var i = parseInt(c);
    if (!(i >= 0 && i < opts.length)) {
        console.log('Invalid selection: ' + c + '; Using ' + opts[0]);
        i = 0;
    }
    return opts[i];
}

request.onOpen = function(response) {
    isopen = true;
    console.log('Connected using ' + response.transport);
    prompt.setPrompt("user: ", 6);
    prompt.prompt();
};

request.onMessage = function (response) {
    var message = response.responseBody;
    try {
        var json = JSON.parse(message);
    } catch (e) {
        console.log('Invalid response: ', message);
        return;
    }
    if (json.author == json.message) {
        console.log(json.author + " joined the room");
    } else {
        console.log(json.author + " says '" + json.message + "'");
    }
    prompt.setPrompt("> ", 2);
    prompt.prompt();
};

request.onReconnect = function(response) {
    console.log('Reconnecting ...');
}

request.onReopen = function(response) {
    isopen = true;
    console.log('Reconnected using ' + response.transport);
    prompt.setPrompt("> ", 2);
    prompt.prompt();
}

request.onClose = function(response) {
    isopen = false;
}

request.onError = function(response) {
    console.log("Sorry, something went wrong: " + response.responseBody);
};

var transport = null;
var subSocket = null;
var author = null;

console.log("Select transport ...");
for (var i = 0; i < TRANSPORT_NAMES.length; i++) { 
    console.log(i + ": " + TRANSPORT_NAMES[i]);
}
prompt.setPrompt("select: ", 6);
prompt.prompt();

prompt.
on('line', function(line) {
    var msg = line.trim();
    if (transport == null) {
        transport = selectOption(msg, TRANSPORT_NAMES);
        request.transport = transport;
        subSocket = atmosphere.subscribe(request);
        console.log("Connecting using " + transport + " ...");
        setTimeout(function() {
            if (!isopen) {
                console.log("Unable to open a connection. Terminated.");
                process.exit(0);
            }
        }, 3000);
    } else if (author == null) {
        author = msg;
    } else {
        subSocket.push(atmosphere.util.stringifyJSON({ author: author, message: msg }));
    }
    prompt.setPrompt("> ", 2);
    prompt.prompt();
}).
on('close', function() {
    console.log("close");
    process.exit(0);
});
