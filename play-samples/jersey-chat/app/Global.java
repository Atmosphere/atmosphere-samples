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
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.play.AtmosphereCoordinator;
import play.Application;
import play.GlobalSettings;
import play.api.mvc.Handler;
import play.mvc.Http.RequestHeader;
import org.atmosphere.play.Router;
import org.atmosphere.samples.play.ChatResource;

import static org.atmosphere.play.AtmosphereCoordinator.*;

public class Global extends GlobalSettings {

    @Override
    public void onStart(Application application) {
        instance().framework().addInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
        instance().path("/chat").discover(ChatResource.class).ready();
    }

    @Override
    public void onStop(Application application) {
        instance().shutdown();
    }

    @Override
    public Handler onRouteRequest(RequestHeader request) {
        return Router.dispatch(request);
    }

}
