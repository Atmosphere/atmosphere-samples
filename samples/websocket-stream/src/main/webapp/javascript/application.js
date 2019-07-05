$(function () {
    "use strict";

    var detect = $('#detect');
    var header = $('#header');
    var content = $('#content');
    var connect = $('#connect');
    var status = $('#status');

    var socket = atmosphere;

    // We are now ready to cut the request
    var request = { url: document.location.toString() + 'stream',
        contentType : "application/json",
        transport : 'websocket'};
    
    connect.click(function() {
        if ('connect' === $(this).attr('value')) {
            // coonnecting ...
            console.log("reconnecting");
            socket.subscribe(request);
        } else {
            // disconnecting ...
            console.log("disconnecting");
            socket.unsubscribe();
        }

    });

    request.onOpen = function(response) {
        content.html($('<p>', { text: 'Atmosphere connected using ' + response.transport }));
        status.text('connected');
        $('#connect').val('disconnect');
    };

    request.onMessage = function (response) {
        var message = response.responseBody;
        try {
            console.log("message: " + message);
            var json = JSON.parse(message);
            status.html(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }
    };

    request.onClose = function(response) {
        content.html($('<p>', { text: 'Atmosphere disconnected from ' + response.transport }));
        $('#connect').val('connect');
    };

    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    // Connect to the server, hook up to the request handler.
    socket.subscribe(request);
    
});

