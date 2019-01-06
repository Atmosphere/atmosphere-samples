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
package org.atmosphere.samples.chat;

import org.atmosphere.config.managed.Decoder;
import org.atmosphere.config.managed.Encoder;
import org.atmosphere.config.service.Disconnect;
import org.atmosphere.config.service.ManagedService;
import org.atmosphere.config.service.Ready;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.cpr.BroadcasterFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;

import static org.atmosphere.cpr.ApplicationConfig.MAX_INACTIVE;

/**
 * Simple annotated class that demonstrate the power of Atmosphere. This class supports all transports, support
 * message length garantee, heart beat, message cache thanks to the {@link ManagedService}.
 * <p/>
 * This class use CDI for creating instance of Encoder and Decoder.
 */
@ManagedService(path = "/chat", atmosphereConfig = MAX_INACTIVE + "=120000")
public class CDIChat {
    private final Logger logger = LoggerFactory.getLogger(CDIChat.class);

    // Normally Encoder and Decoder are managed by the @Message annotation, but for this sample we inject them instead.
    @Inject
    private Decoder<String, Message> decoder;

    @Inject
    private Encoder<Message, String> encoder;

    @Inject
    BroadcasterFactory factory;

    /**
     * Invoked when the connection as been fully established and suspended, e.g ready for receiving messages.
     *
     * @param r
     */
    @Ready
    public void onReady(final AtmosphereResource r) {

        logger.info("Browser {} connected.", r.uuid());
        logger.info("Injected Factory {} connected.", factory.getClass().getName());

    }

    /**
     * Invoked when the client disconnect or when an unexpected closing of the underlying connection happens.
     *
     * @param event
     */
    @Disconnect
    public void onDisconnect(AtmosphereResourceEvent event) {
        if (event.isCancelled()) {
            logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
        } else if (event.isClosedByClient()) {
            logger.info("Browser {} closed the connection", event.getResource().uuid());
        }
    }

    @org.atmosphere.config.service.Message
    public String onMessage(String s) throws IOException {
        Message message = decoder.decode(s);
        logger.info("{} just send {}", message.getAuthor(), message.getMessage());
        return encoder.encode(message);
    }

}