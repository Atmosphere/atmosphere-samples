$(function () {
    "use strict";

    var header = $('#header');
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');
    var myName = false;
    var author = null;
    var logged = false;
    var socket = new SockJS('http://' + window.location.host + '/chat', null, {
                'protocols_whitelist': ['websocket', 'xhr-streaming',
                                        'iframe-eventsource', 'iframe-htmlfile',
                                        'xhr-polling', 'jsonp-polling'] });

    socket.onopen = function() {
        content.html($('<p>', { text: 'Atmosphere connected using SockJs client'}));
        input.removeAttr('disabled').focus();
        status.text('Choose name:');
    };

    socket.onmessage = function (response) {
        var message = response.data;
        try {
            var json = JSON.parse(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }

        input.removeAttr('disabled').focus();
        if (!logged && myName) {
            logged = true;
            status.text(myName + ': ').css('color', 'blue');
        } else {
            var me = json.author == author;
            var date = typeof(json.time) == 'string' ? parseInt(json.time) : json.time;
            addMessage(json.author, json.message, me ? 'blue' : 'black', new Date(date));
        }
    };

    socket.onclose = function() {
        content.html($('<p>', { text: 'Server closed the connection after a timeout' }));
        input.attr('disabled', 'disabled');
    };

    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();

            // First message is always the author's name
            if (author == null) {
                author = msg;
            }

            socket.send(JSON.stringify({ author: author, message: msg }));
            $(this).val('');

            input.attr('disabled', 'disabled');
            if (myName === false) {
                myName = msg;
            }
        }
    });

    function addMessage(author, message, color, datetime) {
        content.append('<p><span style="color:' + color + '">' + author + '</span> @ ' +
            + (datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()) + ':'
            + (datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes())
            + ': ' + message + '</p>');
    }
});
