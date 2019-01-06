/*
 * Copyright 2008-2019 Async-IO.org
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
package org.atmosphere.samples.webrtc;

import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.jersey.SuspendResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/channels/{topic}")
@Produces("text/html;charset=ISO-8859-1")
public class Subscriber {

	private static final Logger logger = LoggerFactory.getLogger(Subscriber.class);

	@GET
	public SuspendResponse<String> subscribe(
			@PathParam("topic") Broadcaster topic) {
		return new SuspendResponse.SuspendResponseBuilder<String>()
				.broadcaster(topic)
				.outputComments(true)
				.build();
	}

	@POST
	//@Broadcast(writeEntity = false)
	public void publish(@FormParam("message") String message,
			@PathParam("topic") Broadcaster topic) {
		logger.info("Sending message {} to channel {}", new Object[] {
				message, topic.getID() });
        // Only way to get it working right now.
//        try {
//            Thread.sleep(1000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
		//return new Broadcastable(message, "", topic);
        topic.broadcast(message);
    }
}
