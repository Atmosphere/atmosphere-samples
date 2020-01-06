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
package it.ad.videochat;


import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.websocket.WebSocketEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class EventsLogger implements WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(EventsLogger.class);

    public EventsLogger() {
    }

    public void onSuspend(
            final AtmosphereResourceEvent event) {
        logger.debug("onSuspend(): "
                + event.getResource().getRequest().getRemoteAddr() + ":"
                + event.getResource().getRequest().getRemotePort());
    }

    public void onResume(
            AtmosphereResourceEvent event) {
        logger.debug("onResume(): "
                + event.getResource().getRequest().getRemoteAddr() + ":"
                + event.getResource().getRequest().getRemotePort());
    }

    public void onDisconnect(
            AtmosphereResourceEvent event) {
        logger.debug("onDisconnect(): "
                + event.getResource().getRequest().getRemoteAddr() + ":"
                + event.getResource().getRequest().getRemotePort());
    }

    public void onHeartbeat(
            AtmosphereResourceEvent event) {
        logger.debug("onHeartbeat(): "
                + event.getResource().getRequest().getRemoteAddr() + ":"
                + event.getResource().getRequest().getRemotePort());
    }

    public void onBroadcast(
            AtmosphereResourceEvent event) {
        logger.debug("onBroadcast(): " + event.getMessage());
    }

    public void onThrowable(
            AtmosphereResourceEvent event) {
        logger.warn("onThrowable(): " + event);
    }

    @Override
    public void onClose(AtmosphereResourceEvent atmosphereResourceEvent) {

    }

    public void onHandshake(WebSocketEvent event) {
        logger.debug("onHandshake(): " + event);
    }

    public void onMessage(WebSocketEvent event) {
        logger.debug("onMessage(): " + event);
    }

    public void onClose(WebSocketEvent event) {
        logger.debug("onClose(): " + event);
    }

    public void onControl(WebSocketEvent event) {
        logger.debug("onControl(): " + event);
    }

    public void onDisconnect(WebSocketEvent event) {
        logger.debug("onDisconnect(): " + event);
    }

    public void onConnect(WebSocketEvent event) {
        logger.debug("onConnect(): " + event);
    }

    public void onPreSuspend(AtmosphereResourceEvent event) {
        logger.debug("onPreSuspend(): " + event);

    }
}
