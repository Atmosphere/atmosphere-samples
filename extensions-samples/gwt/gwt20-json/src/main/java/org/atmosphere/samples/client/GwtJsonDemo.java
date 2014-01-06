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
package org.atmosphere.samples.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.logging.client.HasWidgetsLogHandler;
import com.google.gwt.user.client.rpc.SerializationException;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.Widget;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.atmosphere.gwt20.client.Atmosphere;
import org.atmosphere.gwt20.client.AtmosphereCloseHandler;
import org.atmosphere.gwt20.client.AtmosphereMessageHandler;
import org.atmosphere.gwt20.client.AtmosphereOpenHandler;
import org.atmosphere.gwt20.client.AtmosphereRequest;
import org.atmosphere.gwt20.client.AtmosphereRequestConfig;
import org.atmosphere.gwt20.client.AtmosphereResponse;
import org.atmosphere.gwt20.client.AutoBeanClientSerializer;

/**
 *
 * @author jotec
 */
public class GwtJsonDemo implements EntryPoint {

    static final Logger logger = Logger.getLogger(GwtJsonDemo.class.getName());
    
    private MyBeanFactory beanFactory = GWT.create(MyBeanFactory.class);

    @Override
    public void onModuleLoad() {
        
        GWT.setUncaughtExceptionHandler(new GWT.UncaughtExceptionHandler() {
            @Override
            public void onUncaughtException(Throwable e) {
                logger.log(Level.SEVERE, "Uncaught exception", e);
            }
        });
        
      
        HorizontalPanel buttons = new HorizontalPanel();
        final TextBox messageInput = new TextBox();
        buttons.add(messageInput);
        
        Button sendJSON = new Button("send (JSON)");
        buttons.add(sendJSON);
        
                
        RootPanel.get("buttonbar").add(buttons);
        
        
        HTMLPanel logPanel = new HTMLPanel("") {
            @Override
            public void add(Widget widget) {
                super.add(widget);
                widget.getElement().scrollIntoView();
            }
        };
        RootPanel.get("logger").add(logPanel);
        Logger.getLogger("").addHandler(new HasWidgetsLogHandler(logPanel));
        
                
        AutoBeanClientSerializer json_serializer = new AutoBeanClientSerializer();
        json_serializer.registerBeanFactory(beanFactory, Event.class);        
                       
        // setup JSON Atmosphere connection
        AtmosphereRequestConfig jsonRequestConfig = AtmosphereRequestConfig.create(json_serializer);
        jsonRequestConfig.setUrl(GWT.getModuleBaseURL() + "atmosphere/json");
        jsonRequestConfig.setContentType("application/json; charset=UTF-8");
        jsonRequestConfig.setTransport(AtmosphereRequestConfig.Transport.STREAMING);
        jsonRequestConfig.setFallbackTransport(AtmosphereRequestConfig.Transport.LONG_POLLING);
        jsonRequestConfig.setOpenHandler(new AtmosphereOpenHandler() {
            @Override
            public void onOpen(AtmosphereResponse response) {
                logger.info("JSON Connection opened");
            }
        });
        jsonRequestConfig.setCloseHandler(new AtmosphereCloseHandler() {
            @Override
            public void onClose(AtmosphereResponse response) {
                logger.info("JSON Connection closed");
            }
        });
        jsonRequestConfig.setMessageHandler(new AtmosphereMessageHandler() {
            @Override
            public void onMessage(AtmosphereResponse response) {
                List<Event> events = response.getMessages();
                for (Event event : events) {
                    logger.info("received message through JSON: " + event.getData());
                }
            }
        });
        
        
        Atmosphere atmosphere = Atmosphere.create();
        final AtmosphereRequest jsonRequest = atmosphere.subscribe(jsonRequestConfig);
      
        
        sendJSON.addClickHandler(new ClickHandler() {
          @Override
          public void onClick(ClickEvent event) {
            if (messageInput.getText().trim().length() > 0) {
              try {
                //              service.sendEvent(new Event(messageInput.getText()), callback);
                  Event myevent = beanFactory.create(Event.class).as();
                  myevent.setData(messageInput.getText());
                  jsonRequest.push(myevent);
              } catch (SerializationException ex) {
                logger.log(Level.SEVERE, "Failed to serialize message", ex);
              }
            }
          }
        });
        
        
    }

}
