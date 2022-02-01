/*
 * Copyright 2008-2022 Async-IO.org
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

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.atmosphere.gwt20.client.Atmosphere;
import org.atmosphere.gwt20.client.AtmosphereCloseHandler;
import org.atmosphere.gwt20.client.AtmosphereMessageHandler;
import org.atmosphere.gwt20.client.AtmosphereOpenHandler;
import org.atmosphere.gwt20.client.AtmosphereReopenHandler;
import org.atmosphere.gwt20.client.AtmosphereRequest;
import org.atmosphere.gwt20.client.AtmosphereRequestConfig;
import org.atmosphere.gwt20.client.AtmosphereResponse;
import org.atmosphere.samples.shared.BaseEvent;
import org.atmosphere.samples.shared.EventBar;
import org.atmosphere.samples.shared.EventFoo;

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

/**
 * 
 * @author jotec
 */
public class GwtRpcDemo implements EntryPoint {
    
    static final Logger logger = Logger.getLogger(GwtRpcDemo.class.getName());
    
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
        
        Button sendRPC = new Button("send (GWT-RPC)");
        buttons.add(sendRPC);
        
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
        
        RPCSerializer rpc_serializer = GWT.create(RPCSerializer.class);
        
        AtmosphereRequestConfig rpcRequestConfig = AtmosphereRequestConfig.create(rpc_serializer);
        rpcRequestConfig.setUrl(GWT.getModuleBaseURL() + "atmosphere/rpc");
        rpcRequestConfig.setTransport(AtmosphereRequestConfig.Transport.STREAMING);
        rpcRequestConfig.setFallbackTransport(AtmosphereRequestConfig.Transport.LONG_POLLING);
        rpcRequestConfig.setOpenHandler(new AtmosphereOpenHandler() {
            @Override
            public void onOpen(AtmosphereResponse response) {
                logger.info("RPC Connection opened");
            }
        });
        rpcRequestConfig.setReopenHandler(new AtmosphereReopenHandler() {
            @Override
            public void onReopen(AtmosphereResponse response) {
                logger.info("RPC Connection reopened");
            }
        });
        rpcRequestConfig.setCloseHandler(new AtmosphereCloseHandler() {
            @Override
            public void onClose(AtmosphereResponse response) {
                logger.info("RPC Connection closed");
            }
        });
        rpcRequestConfig.setMessageHandler(new AtmosphereMessageHandler() {
            @Override
            public void onMessage(AtmosphereResponse response) {
                List<BaseEvent> messages = response.getMessages();
                for (BaseEvent event : messages) {
                    logger.info("received message through RPC: " + event.toString());
                }
            }
        });
        
        // trackMessageLength is not required but makes the connection more
        // robust, does not seem to work with
        // unicode characters
        // rpcRequestConfig.setFlags(Flags.trackMessageLength);
        
        Atmosphere atmosphere = Atmosphere.create();
        final AtmosphereRequest rpcRequest = atmosphere.subscribe(rpcRequestConfig);
        
        sendRPC.addClickHandler(new ClickHandler() {
            private boolean bToogle = false;
            
            @Override
            public void onClick(ClickEvent event) {
                if (messageInput.getText().trim().length() > 0) {
                    try {
                        if (bToogle) {
                            EventFoo myevent2 = new EventFoo();
                            myevent2.setData1(messageInput.getText());
                            myevent2.setData2(messageInput.getText());
                            rpcRequest.push(myevent2);
                            bToogle = false;
                            
                        } else {
                            EventBar myevent2 = new EventBar();
                            myevent2.setData1(messageInput.getText());
                            myevent2.setData2(messageInput.getText());
                            rpcRequest.push(myevent2);
                            bToogle = true;
                            
                        }
                    } catch (SerializationException ex) {
                        logger.log(Level.SEVERE, "Failed to serialize message", ex);
                    }
                }
            }
        });
        
    }
    
}
