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
package org.atmosphere.vertx.samples.chat;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Context;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.vertx.VertxAtmosphere;

/**
 * A bootstrap class that start Vertosphere and the Atmosphere Chat samples.
 */
public class VertxJerseyChat extends AbstractVerticle {

    private HttpServer httpServer;
    private Vertx vertx;

    @Override
    public void init(Vertx vertx, Context context) {
        this.vertx = vertx;
        httpServer = vertx.createHttpServer();
    }

    @Override
    public void start(Future<Void> future) throws Exception {
        VertxAtmosphere.Builder b = new VertxAtmosphere.Builder();

        b.resource(ResourceChat.class).httpServer(httpServer)
                .url("/chat")
                .webroot("src/main/webapp/")
                .initParam(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json")
                .vertx(vertx)
                .build();
        httpServer.listen(8080);
    }

    @Override
    public void stop(Future<Void> future) throws Exception {
        httpServer.close();
    }
}
