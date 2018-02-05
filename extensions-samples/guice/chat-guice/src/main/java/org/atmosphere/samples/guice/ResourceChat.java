/*
 * Copyright 2008-2018 Async-IO.org
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
package org.atmosphere.samples.guice;

import com.google.inject.Inject;
import org.atmosphere.annotation.Broadcast;
import org.atmosphere.annotation.Suspend;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;

@Path("/")
@Produces("application/json")
public class ResourceChat {

    private final InjectedService injectedService;

    @Inject
    ResourceChat(InjectedService injectedService) {
        this.injectedService = injectedService;
    }

    @Suspend(listeners = EventListener.class)
    @GET
    public String suspend() {
        if (injectedService == null) {
            throw new WebApplicationException(500);
        }
        return "";
    }

    /**
     * Broadcast the received message object to all suspended response. Do not write back the message to the calling connection.
     *
     * @param message a {@link Message}
     * @return a {@link Response}
     */
    @Broadcast(writeEntity = false)
    @POST
    public Response broadcast(Message message) {
        if (injectedService == null) {
            throw new WebApplicationException(500);
        }
        return new Response(message.author, message.message);
    }

}
