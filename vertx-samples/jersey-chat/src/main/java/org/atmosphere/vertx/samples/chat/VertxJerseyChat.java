/*
 * Copyright 2012 Jeanfrancois Arcand
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
package org.atmosphere.vertx.samples.chat;

import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.vertx.VertxAtmosphere;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;

/**
 * A bootstrap class that start Vertosphere and the Atmosphere Chat samples.
 */
public class VertxJerseyChat extends Verticle {

    private static final Logger logger = LoggerFactory.getLogger(VertxJerseyChat.class);

    @Override
    public void start() {
        VertxAtmosphere.Builder b = new VertxAtmosphere.Builder();
        HttpServer httpServer = vertx.createHttpServer();

        httpServer.requestHandler(new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                String path = req.path();
                if (path.equals("/")) {
                    path = "/index.html";
                }

                logger.info("Servicing request {}", path);
                req.response().sendFile("webapp/" + path);
            }
        });

        b.resource(ResourceChat.class)
         .initParam(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json")
         .httpServer(httpServer).url("/chat").build();

        httpServer.listen(8080);
    }
}
