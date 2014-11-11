/*
 * Copyright 2014 Jeanfrancois Arcand
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

import org.atmosphere.config.service.AtmosphereHandlerService;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereRequest;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResponse;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.cpr.BroadcasterFactory;
import org.atmosphere.cpr.HeaderConfig;
import org.atmosphere.handler.AbstractReflectorAtmosphereHandler;
import org.atmosphere.websocket.WebSocketEventListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@AtmosphereHandlerService
public class AtmosphereHandlerPubSub extends AbstractReflectorAtmosphereHandler {

    private static final Logger logger = LoggerFactory
            .getLogger(AtmosphereHandlerPubSub.class);

    public void onRequest(AtmosphereResource r) throws IOException {

        AtmosphereRequest req = r.getRequest();
        AtmosphereResponse res = r.getResponse();
        String method = req.getMethod();

        // Suspend the response.
        if ("GET".equalsIgnoreCase(method)) {
            // Log all events on the console, including WebSocket events.
            r.addEventListener(new WebSocketEventListenerAdapter());

            res.setContentType("text/html;charset=ISO-8859-1");

            Broadcaster b = lookupBroadcaster(r);
            r.setBroadcaster(b);

            if (req.getHeader(HeaderConfig.X_ATMOSPHERE_TRANSPORT)
                    .equalsIgnoreCase(HeaderConfig.LONG_POLLING_TRANSPORT)) {
                req.setAttribute(ApplicationConfig.RESUME_ON_BROADCAST,
                        Boolean.TRUE);
                r.suspend();
            } else {
                r.suspend(-1);
            }
        } else if ("POST".equalsIgnoreCase(method)) {
            Broadcaster b = lookupBroadcaster(r);

            String message = req.getReader().readLine();

            if (message != null && message.indexOf("message") != -1) {
                logger.info("Sending message {} to channel {}", new Object[]{
                        message.substring("message=".length()), b.getID()});
                b.broadcast(message.substring("message=".length()));
            }
        }
    }

    public void destroy() {
    }

    /**
     * Retrieve the {@link Broadcaster} based on the request's path info.
     *
     * @param ar
     * @return the {@link Broadcaster} based on the request's path info.
     */
    Broadcaster lookupBroadcaster(AtmosphereResource ar) {

        String pathInfo = ar.getRequest().getPathInfo();
        String[] decodedPath = pathInfo.split("/");
        Broadcaster b = ar.getAtmosphereConfig().getBroadcasterFactory().lookup(
                decodedPath[decodedPath.length - 1], true);
        return b;
    }
}
