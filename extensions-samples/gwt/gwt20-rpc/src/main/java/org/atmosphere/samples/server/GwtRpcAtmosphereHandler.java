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
package org.atmosphere.samples.server;

import java.io.IOException;
import java.util.logging.Logger;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.DefaultBroadcasterFactory;
import org.atmosphere.gwt20.shared.Constants;
import org.atmosphere.handler.AbstractReflectorAtmosphereHandler;

/**
 * This is a simple handler example to show how to use GWT RPC serialization
 * 
 * @author p.havelaar
 */
public class GwtRpcAtmosphereHandler extends AbstractReflectorAtmosphereHandler {
    
  static final Logger logger = Logger.getLogger("AtmosphereHandler");
    @Override
    public void onRequest(AtmosphereResource ar) throws IOException {
      if (ar.getRequest().getMethod().equals("GET") ) {
        doGet(ar);
      } else if (ar.getRequest().getMethod().equals("POST") ) {
        doPost(ar);
      }
    }
    
    public void doGet(AtmosphereResource ar) {
        
       // lookup the broadcaster, if not found create it. Name is arbitrary
        ar.setBroadcaster(ar.getAtmosphereConfig().getBroadcasterFactory().lookup("MyBroadcaster", true));
        
        ar.suspend();
    }
    
    /**
     * receive push message from client
     **/
    public void doPost(AtmosphereResource ar) {
        Object msg = ar.getRequest().getAttribute(Constants.MESSAGE_OBJECT);
        if (msg != null) {
          logger.info("received RPC post: " + msg.toString());
          // for demonstration purposes we will broadcast the message to all connections
            ar.getAtmosphereConfig().getBroadcasterFactory().lookup("MyBroadcaster").broadcast(msg);
        }
    }


    @Override
    public void destroy() {
        
    }

}
