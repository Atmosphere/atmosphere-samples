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
package org.atmosphere.samples.pubsub;

import org.atmosphere.config.service.MeteorService;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.cpr.Meteor;
import org.atmosphere.websocket.WebSocketEventListenerAdapter;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Simple PubSub resource that demonstrate many functionality supported by
 * Atmosphere JQuery Plugin (WebSocket, Comet) and Atmosphere Meteor extension.
 *
 * @author Jeanfrancois Arcand
 */
@MeteorService(path="/pubsub/{topic}")
public class MeteorPubSub extends HttpServlet {

    @Inject
    @Named("/{topic}")
    private Broadcaster broadcaster;

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        // Create a Meteor
        Meteor m = Meteor.build(req);

        // Log all events on the console, including WebSocket events.
        m.addListener(new WebSocketEventListenerAdapter());

        res.setContentType("text/html;charset=ISO-8859-1");

        m.setBroadcaster(broadcaster);
        m.suspend(-1);
    }

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String message = req.getReader().readLine();

        if (message != null && message.indexOf("message") != -1) {
            broadcaster.broadcast(message.substring("message=".length()));
        }
    }
}
