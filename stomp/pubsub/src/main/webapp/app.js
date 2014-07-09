// Callback when a message is delivered
var callback = function (frame) {
    messages.innerHTML = [frame.body, "<BR />", messages.innerHTML].join("");
};

var disconnect = function() {
    client.disconnect();
};

// Subscribe/unsubscribe to the given destination
var pubsub = function (destination) {
    var subscribe = this.value === "SUBSCRIBE";

    if (!subscribe) {
        this.value = "SUBSCRIBE";
        subscriptions[destination].unsubscribe();
    } else {
        subscriptions[destination] = client.subscribe("/destination-" + destination, callback);
        this.value = "UNSUBSCRIBE";
    }
};

// Send action to the selected destination
var send = function () {
    var headers = receipt.checked ? { "receipt-id": "4000" } : {};
    client.send("/destination-" + (destinationSelect.selectedIndex + 1), headers, sendText.value);
};

// Track subscriptions to unsubscribe then
var subscriptions = [];

// DOM
var messages = document.getElementById('messages');
var destinationSelect = document.getElementById('destination');
var sendText = document.getElementById('send');
var receipt = document.getElementById('receipt');

// We are now ready to cut the request
var request = {
    url: document.location.protocol + "//" + document.location.host + '/stomp',
    contentType: "application/json",
    logLevel: 'debug',
    transport: 'websocket',
    enableProtocol: true,
    fallbackTransport: 'long-polling'
};

// With the request, atmosphere will subscribe a connection to server
// and expose an object with functions defined in websocket interface
var subscription = new $.atmosphere.WebsocketApiAdapter(request);

// This kind of object is required by Stomp.js
// The client will be used to send/receive messages and also subscribe/unsubscribe to destinations
var client = Stomp.over(subscription);

client.heartbeat.outgoing = 20000; // client will send heartbeats every 20000ms
client.heartbeat.incoming = 70000;

// Establish a connection as specified by stomp protocol by sending a connect frame
client.connect();