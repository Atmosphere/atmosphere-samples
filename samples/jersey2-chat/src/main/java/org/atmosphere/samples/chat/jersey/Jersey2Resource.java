/*
 * Copyright 2008-2020 Async-IO.org
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
package org.atmosphere.samples.chat.jersey;

import org.atmosphere.client.TrackMessageSizeInterceptor;
import org.atmosphere.config.service.AtmosphereService;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.cpr.AtmosphereResourceEventListenerAdapter;
import org.atmosphere.interceptor.AtmosphereResourceLifecycleInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

/**
 * Extremely simple chat application supporting WebSocket, Server Side-Events, Long-Polling and Streaming.
 *
 * @author Jeanfrancois Arcand
 */
@Path("/")
@AtmosphereService(
        dispatch = true,
        interceptors = {AtmosphereResourceLifecycleInterceptor.class, TrackMessageSizeInterceptor.class},
        path = "/chat",
        servlet = "org.glassfish.jersey.servlet.ServletContainer")
public class Jersey2Resource {

    private final Logger logger = LoggerFactory.getLogger(Jersey2Resource.class);

    @Context
    private HttpServletRequest request;

    @GET
    public void configureAtmosphereResource() {
        AtmosphereResource r = (AtmosphereResource) request.getAttribute(ApplicationConfig.ATMOSPHERE_RESOURCE);

        if (r != null) {
            r.addEventListener(new AtmosphereResourceEventListenerAdapter.OnDisconnect() {
                @Override
                public void onDisconnect(AtmosphereResourceEvent event) {
                    if (event.isCancelled()) {
                        logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
                    } else if (event.isClosedByClient()) {
                        logger.info("Browser {} closed the connection", event.getResource().uuid());
                    }
                }
            });
        } else {
            throw new IllegalStateException();
        }
    }


    /**
     * Echo the chat message. Jackson can clearly be used here, but for simplicity we just echo what we receive.
     *
     * @param message
     */
    @POST
    public void broadcast(String message) {
        AtmosphereResource r = (AtmosphereResource) request.getAttribute(ApplicationConfig.ATMOSPHERE_RESOURCE);

        if (r != null) {
            r.getBroadcaster().broadcast(message);
        } else {
            throw new IllegalStateException();
        }
    }

}
