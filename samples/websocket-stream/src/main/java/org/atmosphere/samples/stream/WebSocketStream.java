/*
 * Copyright 2016 Async-IO.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.atmosphere.samples.stream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmosphere.config.service.WebSocketHandlerService;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.util.SimpleBroadcaster;
import org.atmosphere.websocket.WebSocket;
import org.atmosphere.websocket.WebSocketEventListenerAdapter;
import org.atmosphere.websocket.WebSocketHandler;
import org.atmosphere.websocket.WebSocketStreamingHandlerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Simple {@link WebSocketHandler} that implement the logic to build a streaming application.
 *
 * @author Jeanfrancois Arcand
 */
@WebSocketHandlerService(path = "/stream", broadcaster = SimpleBroadcaster.class,
        atmosphereConfig = {"org.atmosphere.websocket.WebSocketProtocol=org.atmosphere.websocket.protocol.StreamingHttpProtocol"})
public class WebSocketStream extends WebSocketStreamingHandlerAdapter {

    private final Logger logger = LoggerFactory.getLogger(WebSocketStream.class);
 
    
    // A thread which sends a stream of data out of a websocket. Create when the class
    // is instantiated, inject the websocket when open.
    private class Stream extends Thread {
    	protected WebSocket socket;
    	protected final ObjectMapper mapper = new ObjectMapper();
    	protected boolean stop = false;
    	
    	public Stream(WebSocket socket) {
    		this.socket = socket;
    	}
    	
    	public void run() {
    		int count = 0;
    		try {
	    		while (!stop) {
	    			Map<String, Object> message = new HashMap<String, Object>();
	    			message.put("time", new Date().toString());
	    			message.put("count", count++);
	    			String string = mapper.writeValueAsString(message);
    		        socket.write(string);
	    			System.out.println("tick: " + string);
	    			Thread.sleep(1000);
	    		}
    		} catch (Exception x) {
    			// break.
    		}
    	}
    }

    int clients = 0;
    
    @Override
    public void onOpen(WebSocket webSocket) throws IOException {
    	// Hook up the stream.
    	final Stream stream = new Stream(webSocket);
    	stream.start();
   
    	webSocket.broadcast("client " + clients++ + " connected");
        webSocket.resource().addEventListener(new WebSocketEventListenerAdapter() {
            @Override
            public void onDisconnect(AtmosphereResourceEvent event) {
                if (event.isCancelled()) {
                    logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
                } else if (event.isClosedByClient()) {
                    logger.info("Browser {} closed the connection", event.getResource().uuid());
                }
                stream.stop = true;
            }
        });
    }
}
