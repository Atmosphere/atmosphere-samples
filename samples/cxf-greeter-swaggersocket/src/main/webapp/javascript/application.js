$(function () {
    "use strict";

    var content = $('#content');

    var buttonping = $('#buttonping');

    var buttonecho = $('#buttonecho');
    var textecho = $('#textecho');

    var buttongreet = $('#buttongreet');
    var namegreet = $('#namegreet');
    var namegreeter = $('#namegreeter');
    var textgreeter = $('#textgreeter');

    var buttongreetstatus = $('#buttongreetstatus');
    var namegreetstatus = $('#namegreetstatus');

    var buttongreetsummary = $('#buttongreetsummary');

    var status = $('#status');

    var logged = false;
    var socket = atmosphere;
    var count = 0;

    var request = { url: document.location.toString().split("index.html")[0] + 'greeter',
                    contentType : "application/json",
                    logLevel : 'debug',
                    transport : 'websocket',
                    enableProtocol: false,
                    trackMessageLength : false,
                    reconnectInterval : 5000};

    request.onOpen = function(response) {
        if (logged) {
            console.log("Warning: already opened");
            return;
        }
        content.html($('<p>', { text: 'Atmosphere connected using ' + response.transport }));
        logged = true;
        status.text('Invoke some operation:');
    };
    
    request.onReopen = function(response) {
        if (logged) {
            console.log("Warning: already reconnected");
            return;
        }
        content.html($('<p>', { text: 'Atmosphere reconnected using ' + response.transport }));
        logged = true;
        status.text('Invoke some operation:');
    }

    request.onReconnect = function(response) {
        content.html($('<p>', { text: 'Atmosphere reconnecting using ' + response.transport + ' ...'}));
        status.text('Connecting...');
    }

    request.onMessage = function (response) {
        var message = response.responseBody;
        var bpos = findjsonboundary(message);
        if (bpos < 0) {
            console.log('This doesn\'t look like a valid swagger message: ', message);
            return;
        }
        var headers;
        try {
            headers = atmosphere.util.parseJSON(message.substring(0, bpos));
        } catch (e) {
            console.log('This doesn\'t look like a valid swagger message: ', message);
            return;
        }

        addResponseMessage(headers, message.substring(bpos));
    };

    request.onClose = function(response) {
        if (!logged) {
            console.log("Warning: already closed");
            return;
        }
        logged = false;
    }

    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    var subSocket = socket.subscribe(request);

    buttonping.click(function() {
        var headers = { "id": getNextId(), "method": "GET", "path": "/v1/ping"};
        var body = "";
        addRequestMessage(headers, body);
        var req = atmosphere.util.stringifyJSON(headers);
        subSocket.push(req);
    });

    buttonecho.click(function() {
        var headers = { "id": getNextId(), "method": "POST", "path": "/v1/echo", "type": "text/plain"};
        var body = textecho.val();
        textecho.val("");
        addRequestMessage(headers, body);
        var req = atmosphere.util.stringifyJSON(headers) + body;
        subSocket.push(req);
    });

    buttongreet.click(function() {
        var headers = { "id": getNextId(), "method": "POST", "path": "/v1/greet/" + namegreet.val(), "type": "application/json"};
        var body = atmosphere.util.stringifyJSON({ "name": namegreeter.val(), "text": textgreeter.val()});
        namegreet.val("");
        namegreeter.val("");
        textgreeter.val("");
        addRequestMessage(headers, body);
        var req = atmosphere.util.stringifyJSON(headers) + body;
        subSocket.push(req);
    });

    buttongreetstatus.click(function() {
        var headers = { "id": getNextId(), "method": "GET", "path": "/v1/greet/" + namegreetstatus.val()};
        var body = "";
        addRequestMessage(headers, body);
        var req = atmosphere.util.stringifyJSON(headers);
        subSocket.push(req);
    });

    buttongreetsummary.click(function() {
        var headers = { "id": getNextId(), "method": "GET", "path": "/v1/greet"};
        var body = "";
        addRequestMessage(headers, body);
        var req = atmosphere.util.stringifyJSON(headers);
        subSocket.push(req);
    });

    function addRequestMessage(headers, body) {
        content.append('<p>req[' + headers.id +  ']: <span style="color:blue">' + atmosphere.util.stringifyJSON(headers) + '</span> ' +
                       '<span style="color:green">' + body + '</span></p>');
    }

    function addResponseMessage(headers, body) {
        if (headers.heartbeat != undefined) {
            content.append('<p>ctr: <span style="color:gray">' + atmosphere.util.stringifyJSON(headers) + '</span></p>');
            return;
        }

        var color = headers.code == 200 ? "blue": "red";
        content.append('<p>res[' + headers.id +  ']: <span style="color:' + color + '">' + atmosphere.util.stringifyJSON(headers) + '</span> ' +
                       '<span style="color:green">' + body + '</span></p>');
    }

    function getNextId() {
        return (count++).toString();
    }

    function findjsonboundary(value) {
        var depth = 0;
        var instr;
        for (var i = 0; i < value.length; i++) {
            switch (value.charAt(i)) {
            case '\\':
                i++;
                break;
            case '{':
                if (instr == undefined) {
                    depth++;
                }
                break;
            case '}':
                if (instr === undefined) {
                    depth--;
                    if (depth == 0) {
                        return i + 1;
                    }
                }
                break;
            case '\'':
                if (instr === '\'') {
                    instr = undefined;
                } else {
                    instr = '\'';
                }
                break;
            case '\"':
                if (instr === '\"') {
                    instr = undefined;
                } else {
                    instr = '\"';
                }
                break;
            }
        }
        // no boundary found
        return -1;
    }
});

