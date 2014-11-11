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
package org.atmosphere.samples.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.DefaultBroadcasterFactory;
import org.atmosphere.cpr.Serializer;
import org.atmosphere.gwt20.jackson.JacksonSerializerProvider;
import org.atmosphere.gwt20.server.SerializationException;
import org.atmosphere.gwt20.server.ServerSerializer;
import org.atmosphere.handler.AbstractReflectorAtmosphereHandler;

/**
 * This is a simple handler to show how to use JSON with the gwt-wrapper client
 * 
 * @author p.havelaar
 */
public class JsonAtmosphereHandler extends AbstractReflectorAtmosphereHandler {
    
  static final Logger logger = Logger.getLogger("AtmosphereHandler");
    @Override
    public void onRequest(AtmosphereResource ar) throws IOException {
      if (ar.getRequest().getMethod().equals("GET") ) {
        doGet(ar);
      } else if (ar.getRequest().getMethod().equals("POST") ) {
        doPost(ar);
      }
    }
    
    private ServerSerializer serializer = new JacksonSerializerProvider().getServerSerializer();
    
    public void doGet(final AtmosphereResource ar) {
        
        ar.getResponse().setCharacterEncoding(ar.getRequest().getCharacterEncoding());
        ar.getResponse().setContentType("application/json");
        
        // lookup the broadcaster, if not found create it. Name is arbitrary
        ar.setBroadcaster(ar.getAtmosphereConfig().getBroadcasterFactory().lookup("MyBroadcaster", true));
        
        ar.setSerializer(new Serializer() {
            Charset charset = Charset.forName(ar.getResponse().getCharacterEncoding());
            @Override
            public void write(OutputStream os, Object o) throws IOException {
                try {
                    logger.info("Writing object to JSON outputstream with charset: " + charset.displayName());
                    String payload = serializer.serialize(o);
                    os.write(payload.getBytes(charset));
                    os.flush();
                } catch (SerializationException ex) {
                    throw new IOException("Failed to serialize object to JSON", ex);
                }
            }
        });
        
        ar.suspend();
    }
    
    public void doPost(AtmosphereResource ar) throws IOException {
        StringBuilder data = new StringBuilder();
        BufferedReader requestReader;
        try {
            requestReader = ar.getRequest().getReader();
            char[] buf = new char[5120];
            int read = -1;
            while ((read = requestReader.read(buf)) > 0) {
              data.append(buf, 0, read);
            }
            logger.info("Received json message from client: " + data.toString());
        
            Object message = serializer.deserialize(data.toString());
            ar.getAtmosphereConfig().getBroadcasterFactory().lookup("MyBroadcaster").broadcast(message);
            
        } catch (SerializationException ex) {
            logger.log(Level.SEVERE, "Failed to read request data", ex);
        }
        
    }
    

    @Override
    public void destroy() {
        
    }

}
