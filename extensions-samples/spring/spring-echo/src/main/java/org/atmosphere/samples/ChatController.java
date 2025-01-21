/*
 * Copyright 2008-2025 Async-IO.org
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
package org.atmosphere.samples;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.cpr.BroadcasterFactory;
import org.atmosphere.cpr.Serializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.OutputStream;

@RestController
@RequestMapping("chat")
public class ChatController {

	private Logger logger = LoggerFactory.getLogger(getClass());

	private BroadcasterFactory broadcasterFactory;

	private Broadcaster getBroadcaster(String name) {
		Broadcaster b = broadcasterFactory.lookup(name);
		if (b == null) {
			b = broadcasterFactory.get(name);
			logger.info("create new broadcaster (name : {}) : {}", name, b);
			return b;
		} else {
			return b;
		}
	}
	
	private static final ObjectMapper jackson = new ObjectMapper();
	
	private Serializer jsonSerializer = new Serializer() {
		@Override
		public void write(OutputStream os, Object o) throws IOException {
			os.write(jackson.writeValueAsBytes(o));
		}
	};
	
	
	@RequestMapping("connect")  // websocket connection
	public void openWsSession(AtmosphereResource resource){
	    logger.info("new ws resource : {}", resource);
	    if(broadcasterFactory == null){
	        broadcasterFactory = resource.getAtmosphereConfig().getBroadcasterFactory();
	    }
	    resource.setSerializer(jsonSerializer);
	    
	    Broadcaster broadcaster = getBroadcaster("/chat");
	    broadcaster.addAtmosphereResource(resource);
	}
	
	
	@RequestMapping(value="sendMessage", method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void sendMessage(@RequestBody Message message) throws JsonProcessingException{

		Broadcaster broadcaster= getBroadcaster("/chat");
		
		logger.info("broadcast message to {} resources", broadcaster.getAtmosphereResources().size());
		broadcaster.broadcast(message);
	}
	
	public static class Message{
		public String author,text;
	}
}
