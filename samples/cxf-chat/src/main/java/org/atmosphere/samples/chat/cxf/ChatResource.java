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
package org.atmosphere.samples.chat.cxf;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmosphere.cpr.AtmosphereResource;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

/**
 * Simple chat resource demonstrating the power of Atmosphere with Apache CXF. This resource supports transport like WebSocket, Streaming, JSONP and Long-Polling.
 *
 */
@Path("/")
public class ChatResource {
    @Context
    HttpServletRequest req;

    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * Suspend the response without writing anything back to the client.
     *
     * @return a white space
     */
    @GET
    public String suspend() {
        AtmosphereResource r = (AtmosphereResource)req.getAttribute("org.atmosphere.cpr.AtmosphereResource");
        r.setBroadcaster(r.getAtmosphereConfig().getBroadcasterFactory().lookup("/cxf-chat", true)).suspend();
        return "";
    }

    /**
     * Broadcast the received message object to all suspended response. Do not write back the message to the calling connection.
     *
     * @param message a {@link Message}
     * @return a {@link Response}
     */
    @POST
    @Produces("application/json")
    public String broadcast(Message message) {
        try {
            Response msg = new Response(message.author, message.message);
            AtmosphereResource r = (AtmosphereResource)req.getAttribute("org.atmosphere.cpr.AtmosphereResource");
            r.getAtmosphereConfig().getBroadcasterFactory().lookup("/cxf-chat").broadcast(mapper.writeValueAsString(msg));
        } catch (JsonProcessingException e) {
            //ignore
        }
        return "";
    }
}
