// Subscribe/unsubscribe to the given destination
function pubsub(destination) {
    subSocket.push([this.value, "\n", "id:0\n", "destination:/destination-", destination, "\n", "\n"].join(""));
    this.value = this.value === "SUBSCRIBE" ? "UNSUBSCRIBE" : "SUBSCRIBE";
}

// Send action to the selected destination
function send() {
    subSocket.push(["SEND\ndestination:/destination-",
        destinationSelect.selectedIndex + 1,
        "\ncontent-type:text/plain\n\n",
        sendText.value,
        "\n"].join(""));
}

var socket = $.atmosphere;
var subSocket;
var transport = 'websocket';
var messages = document.getElementById('messages');
var destinationSelect = document.getElementById('destination');
var sendText = document.getElementById('send');

// We are now ready to cut the request
var request = { url: document.location.protocol + "//" + document.location.host + '/stomp',
    contentType: "application/json",
    logLevel: 'debug',
    transport: transport,
    enableProtocol: true,
    fallbackTransport: 'long-polling'};


request.onOpen = function (response) {
    console.log('Atmosphere connected using ' + response.transport);
    transport = response.transport;
};

request.onMessage = function (response) {
    messages.innerHTML = [response.responseBody, "<BR />", messages.innerHTML].join("");
};

request.onClose = function (response) {
    console.log('closed');
};

request.onError = function (response) {
    console.log('Sorry, but there\'s some problem with your socket or the server is down');
};

subSocket = socket.subscribe(request);