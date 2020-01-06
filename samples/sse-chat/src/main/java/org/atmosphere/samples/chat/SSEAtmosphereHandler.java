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
package org.atmosphere.samples.chat;

import org.atmosphere.config.service.AtmosphereHandlerService;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.cpr.AtmosphereResponse;
import org.atmosphere.handler.OnMessage;
import org.atmosphere.interceptor.AtmosphereResourceLifecycleInterceptor;
import org.atmosphere.interceptor.BroadcastOnPostAtmosphereInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Date;

/**
 * Simple AtmosphereHandler that implement the logic to build a Server Side Events Chat application.
 *
 * @author Jeanfrancois Arcand
 */
@AtmosphereHandlerService(path = "/chat",
        interceptors= {AtmosphereResourceLifecycleInterceptor.class,
                       BroadcastOnPostAtmosphereInterceptor.class})
public class SSEAtmosphereHandler extends OnMessage<String> {
    private final Logger logger = LoggerFactory.getLogger(SSEAtmosphereHandler.class);

    @Override
    public void onMessage(AtmosphereResponse response, String message) throws IOException {
        // Simple JSON -- Use Jackson for more complex structure
        // Message looks like { "author" : "foo", "message" : "bar" }
        String author = message.substring(message.indexOf(":") + 2, message.indexOf(",") - 1);
        String chat = message.substring(message.lastIndexOf(":") + 2, message.length() - 2);

        response.getWriter().write(new Data(author, chat).toString());
    }

    @Override
    public void onDisconnect(AtmosphereResponse response) throws IOException {
        AtmosphereResourceEvent event = response.resource().getAtmosphereResourceEvent();
        if (event.isCancelled()) {
            logger.info("Browser {} unexpectedly disconnected", response.resource().uuid());
        } else if (event.isClosedByClient()) {
            logger.info("Browser {} closed the connection", response.resource().uuid());
        }
    }

    private final static class Data {

        private final String text;
        private final String author;

        public Data(String author, String text) {
            this.author = author;
            this.text = text;
        }

        public String toString() {
            return "{ \"text\" : \"" + text + "\", \"author\" : \"" + author + "\" , \"time\" : " + new Date().getTime() + "}";
        }
    }
}
