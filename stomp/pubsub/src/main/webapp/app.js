// Callback when a message is delivered
function callback (frame) {
    messages.innerHTML = [frame.body, "<BR />", messages.innerHTML].join("");
}

// Subscribe/unsubscribe to the given destination
function pubsub(destination) {
    var subscribe = this.value === "SUBSCRIBE";

    if (!subscribe) {
        this.value = "SUBSCRIBE";
        subscriptions[destination].unsubscribe();
    } else {
        subscriptions[destination] = client.subscribe("/destination-" + destination, callback);
        this.value = "UNSUBSCRIBE";
    }
}

// Send action to the selected destination
function send() {
    // TODO destinationSelect undefined on IE9
    client.send("/destination-" + (destinationSelect.selectedIndex + 1), {}, sendText.value);
}

var subscriptions = [];
var messages = document.getElementById('messages');
var destinationSelect = document.getElementById('destination');
var sendText = document.getElementById('send');

// We are now ready to cut the request
var request = {
    url: document.location.protocol + "//" + document.location.host + '/stomp',
    contentType: "application/json",
    logLevel: 'debug',
    transport: 'websocket',
    enableProtocol: true,
    fallbackTransport: 'long-polling'
};

request.onMessage = function (e) {
    bridge.onmessage({data: e.responseBody});
};

var subSocket = $.atmosphere.subscribe(request);

var bridge = {
    send: function (data) {
        subSocket.push(data);
    },

    onmessage: function(e) {
    },

    onopen: function(e) {
    },

    onclose: function (e) {
    },

    onerror: function (e) {

    }
};
var client = Stomp.over(bridge);
client.connect();
