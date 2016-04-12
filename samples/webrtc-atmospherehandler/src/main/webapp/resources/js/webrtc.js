window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
var mediaConstraints = (typeof window.webkitRTCPeerConnection !== 'undefined') 
    ? {'mandatory': {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true}}
    : {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true};

var socket;
var request;
var source;
var remote;
var history_chat;
var local_chat;
var localStream = null;
var channel;
var remote_videos_number = 0;

var connectedEndpointWebRtc;
var subscribePathWebrtc;
var transport = 'websocket';

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

function initVideoChat(wsUrl) {

    subscribePathWebrtc=wsUrl;

    local = $("div#local");
    source = $("div#local video");
    remote = $("div#remote");
    // Getting reference to chat objects
    history_chat = $("div#history");
    local_chat = $("div#chat input#chat");
    // Setting my username
    window.username = 'user' + Math.floor((Math.random()*1000)+1);
    // Setting my id
    window.session_id = Math.uuidCompact();
    $(document).on("click", "div#remote video", function() {
        $('div#principal').html($(this).parent().html());
    });
    $(document).on("click", "a#mute", function() {
        mute();
    });
    $(document).on("click", "a#unmute", function() {
        unmute();
    });
    $(document).on("click", "a#freeze", function() {
        freeze();
    });
    $(document).on("click", "a#unfreeze", function() {
        unfreeze();
    });
    $(document).on("click", "a#chat", function() {
        chat();
    });
    $(document).on("click", "a#disconnect", function() {
        disconnect();
    });

    // Initializing an empty array for streams
    window.streams = {};
    openChannel();
    startVideo();


};

function openChannel() {
    console.log("Opening channel");
    connectedEndpointWebRtc = subscribeUrl(subscribePathWebrtc + "videochat", onMessage, transport);

}

function onMessage(response) {

    if (response.state != "messageReceived") {
        return;
    }
    var data = getDataFromResponse(response);

    var message = JSON.parse(data);

    if (session_id == message.sender_id) {
        return

    }
    if (message.receiver_id == undefined || message.receiver_id == session_id) {
        console.log("RECEIVED: " + JSON.stringify(message));
        // Message returned from other side
        console.log('Processing signaling message...');
        processSignalingMessage(message);
    }
}

function processSignalingMessage(msg) {
    if (msg.type === 'connect') {
        onConnectReceived(msg);
    } else if (msg.type === 'offer') {
        onOfferReceived(msg);
    } else if (msg.type === 'answer') {
        streams[msg.sender_id].stream
                .setRemoteDescription(new RTCSessionDescription(msg.answer));
    } else if (msg.type === 'candidate') {
        var candidate = new RTCIceCandidate({
            sdpMLineIndex : msg.label,
            candidate : msg.candidate
        });
        streams[msg.sender_id].stream.addIceCandidate(candidate);
    } else if (msg.type === 'bye') {
        onRemoteHangup();
    } else if (msg.type === 'chat') {
        onChatReceived(msg);
    } else if (msg.type === 'howdy') {
        onHowdyReceived(msg);
    }
}

function onHowdyReceived(message) {
    // Adding new object
    if (message.sender_id in self.streams) {
        console.log("Already received an howdy from this user");
    } else {
        streams[message.sender_id] = new Object();
        streams[message.sender_id].username = message.username;
        console.log('Adding ' + message.username + ' to my list of friends');
        // Answering if it was a broadcast
        if (message.receiver_id == undefined) {
            console.log('Answering to ' + message.username);
            sendMessage({
                type : 'howdy',
                username : window.username,
                receiver_id : message.sender_id
            });
        }
        // Adding box
        remote_videos_number += 1;
        img = "remote_video_" + remote_videos_number;
        monitor_div = $('div#remote div#empty_' + remote_videos_number);
        monitor_div.html('<div><a href="#" onclick=connect("'
                + message.sender_id + '")>' + message.username + '</a></div>');
        monitor_div.attr('id', message.sender_id);
    }
}

function onChatReceived(message) {
    history_chat.append("<div><b>" + message.username + ":</b> " + message.text
            + "</div>");
}

function onConnectReceived(message) {
    if (message.sender_id in self.streams) {
        var answer = confirm(streams[message.sender_id].username
                + " wants to start a videochat with you. Dou you agree?");
        if (answer == true) {
            maybeStart(message.sender_id);
            // Caller initiates offer to peer.
            doCall(message.sender_id);
        }
    }
}

function onOfferReceived(message) {
    // Callee creates PeerConnection
    maybeStart(message.sender_id);
    streams[message.sender_id].stream
            .setRemoteDescription(new RTCSessionDescription(message.offer));
    doAnswer(message.sender_id, message);
}

function onSessionConnecting(message) {
    console.log("Session connecting.");
}
function onSessionOpened(message) {
    console.log("Session opened.");
}

// when remote adds a stream, hand it on to the local video element
function onRemoteStreamAdded(event, id) {
    console.log("Added remote stream");
    vid = $('<video autoplay></video>');
    $('div#remote div#' + id).html(
            '<video autoplay src="' + window.URL.createObjectURL(event.stream)
                    + '" width="100%"></video>');
    $('div#principal').html(
            '<video autoplay src="' + window.URL.createObjectURL(event.stream)
                    + '" width="100%"></video>');
}

// when remote removes a stream, remove it from the local video element
function onRemoteStreamRemoved(event) {
    console.log("Remove remote stream");
    remote.attr("src", "");
}

function sendMessage(message) {
    message.sender_id = session_id;
    console.log('Sending: ' + JSON.stringify(message));
    connectedEndpointWebRtc.push({
        data : 'message=' + JSON.stringify(message)
    });
}

function sendMessageChannels(connectedEndpoint, channel) {

    var phrase = $('#msg-' + channel).val();
    connectedEndpoint.push({
        data : "message=" + phrase
    });
}

function chat() {
    history_chat.append("<div><b>Me:</b> " + local_chat.val() + "</div>");
    sendMessage({
        type : 'chat',
        text : local_chat.val(),
        username : window.username
    });
    local_chat.val('');
}

function createPeerConnection(id) {
    var peerConn = null;
    var peerConn_config = {
        "iceServers" : [ {
            "urls" : ["stun:stun.l.google.com:19302", "stun:stun.services.mozilla.com"]
        } ]
    };
    try {
        peerConn = new RTCPeerConnection(peerConn_config);
        peerConn.onicecandidate = function(event) {
            if (event.candidate) {
                sendMessage({
                    type : 'candidate',
                    receiver_id : id,
                    id : event.candidate.sdpMid,
                    label : event.candidate.sdpMLineIndex,
                    candidate : event.candidate.candidate
                });
            } else {
                console.log("End of candidates.");
            }
        };
        console
                .log("Created webkitPeerConnnection00 with config \"STUN stun.l.google.com:19302\".");
    } catch (e) {
        console.error("Failed to create PeerConnection, exception: "
                + e.message);
        alert("Cannot create PeerConnection object; Is the 'PeerConnection' flag enabled in about:flags?");
        return;
    }

    peerConn.onconnecting = onSessionConnecting;
    peerConn.onopen = onSessionOpened;
    peerConn.addEventListener("addstream", function(e) {
        onRemoteStreamAdded(e, id);
    });
    peerConn.onremovestream = onRemoteStreamRemoved;

    return peerConn;
}

function maybeStart(id) {
    if (id in self.streams && self.streams[id].stream != undefined) {
        console.log("Already connected to this peer");
    } else {
        console.log("Creating PeerConnection");
        streams[id].stream = createPeerConnection(id);
        if (source.length > 0 && localStream) {
            console.log("Adding local stream.");
            streams[id].stream.addStream(localStream);
        }
    }
}

function connect(id) {
    if (id == undefined) {
        sendMessage({
            type : 'connect'
        });
    } else {
        sendMessage({
            type : 'connect',
            receiver_id : id
        });
    }
}

function doCall(id) {
    console.log("Send offer to peer");
    streams[id].stream.createOffer(function(session) {
        streams[id].stream.setLocalDescription(session);
        sendMessage({
            type : 'offer',
            offer : session,
            receiver_id : id
        });
    }, function(error) {
           alert(error)}, mediaConstraints);
}

function doAnswer(id, data) {
    console.log("Send answer to peer");
    streams[id].stream.setRemoteDescription(new RTCSessionDescription(
            data.offer));
    streams[id].stream.createAnswer(function(session) {
        streams[id].stream.setLocalDescription(session);
        sendMessage({
            type : 'answer',
            receiver_id : id,
            answer : session
        });
    }, function(error) {
            alert(error);}, mediaConstraints);
}

function disconnect() {
    console.log("Hang up.");
    for ( var id in streams) {
        streams[id].stream.close();
    }
}

function mute() {
    console.log("Muting channel");
    localStream.audioTracks[0].enabled = false;
}

function unmute() {
    console.log("Unmuting channel");
    localStream.audioTracks[0].enabled = true;
}

function freeze() {
    console.log("Freezing channel");
    localStream.videoTracks[0].enabled = false;
}

function unfreeze() {
    console.log("Unfreezing channel");
    localStream.videoTracks[0].enabled = true;
}

function startVideo() {
    // Replace the source of the video element with the stream from the camera
    if (navigator.getUserMedia) {
        try { // try it with spec syntax
            navigator.getUserMedia({
                audio : true,
                video : true
            }, successCallback, errorCallback);
        } catch (e) {
            navigator.getUserMedia("video,audio", successCallback,
                    errorCallback);
        }
    } else {
        alert('getUserMedia() is not supported in your browser');
    }
}

function successCallback(stream) {
    console.log("User has granted access to local media");
    source.attr("src", window.URL.createObjectURL(stream));
    localStream = stream;
    sendMessage({
        type : 'howdy',
        username : window.username
    });
}

function errorCallback(error) {
    console.error('An error occurred: [CODE ' + error.code + ']');
}

function stopVideo() {
    source.attr("src", "");
};

function subscribeUrl(channel, call, transport) {
    var location = channel;
    return subscribeAtmosphere(location, call, transport);
}

function subscribeAtmosphere(location, call, transport) {
	var rq = $.atmosphere.subscribe(location, globalCallback,
			$.atmosphere.request = {
				logLevel : 'debug',
				transport : transport,
				callback : call
			});
	return rq;
}

function globalCallback(response) {
    if (response.state != "messageReceived") {
        return;
    }
}

function getDataFromResponse(response) {
	var detectedTransport = response.transport;
	console.log("[DEBUG] Real transport is <" + detectedTransport + ">");
	if (response.transport != 'polling' && response.state != 'connected'
			&& response.state != 'closed') {
		if (response.status == 200) {
			return response.responseBody;
		}
	}
	return null;
}
