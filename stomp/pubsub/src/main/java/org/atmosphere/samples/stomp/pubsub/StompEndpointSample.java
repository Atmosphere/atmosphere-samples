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


package org.atmosphere.samples.stomp.pubsub;

import org.atmosphere.config.service.Heartbeat;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.stomp.annotation.StompEndpoint;
import org.atmosphere.stomp.annotation.StompService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>
 * An basic annotated service class that use stomp support.
 * </p>
 *
 * @author Guillaume DROUET
 * @since 2.2
 * @version 1.0
 */
@StompEndpoint
public class StompEndpointSample {

    /**
     * The logger.
     */
    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * The heartbeat listener.
     *
     * @param event the event
     */
    @Heartbeat
    public void onHeartbeat(final AtmosphereResourceEvent event) {
        log.info("Heartbeat received from {}", event);
    }

    /**
     * <p>
     * Broadcast message by returning a {@code String}.
     * </p>
     *
     * @param body the message body
     * @return the message to send by the broadcaster associated to the path specified in frame headers
     * @throws IOException if body can't be read
     */
    @StompService(destination = "/destination-1")
    public String destination1(final String body) throws IOException {
        final String now = new SimpleDateFormat("HH:mm:ss").format(new Date());
        return String.format("%s - value '%s' returned from method mapped to /destination-1", now, body);
    }

    /**
     * <p>
     * Broadcast message by returning a {@code String}.
     * </p>
     *
     * @param body the message body
     * @return the message to send by the broadcaster associated to the path specified in frame headers
     * @throws IOException if body can't be read
     */
    @StompService(destination = "/destination-2")
    public String destination2(final String body) throws IOException {
        final String now = new SimpleDateFormat("HH:mm:ss").format(new Date());
        return String.format("%s - value '%s' returned from method mapped to /destination-2", now, body);
    }

    /**
     * <p>
     * Broadcast message by returning a {@code String}.
     * </p>
     *
     * @param body the message body
     * @return the message to send by the broadcaster associated to the path specified in frame headers
     * @throws IOException if body can't be read
     */
    @StompService(destination = "/destination-3")
    public String destination3(final String body) throws IOException {
        final String now = new SimpleDateFormat("HH:mm:ss").format(new Date());
        return String.format("%s - value '%s' returned from method mapped to /destination-3", now, body);
    }
}
