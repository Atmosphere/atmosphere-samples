package org.atmosphere.samples.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.dom.client.Element;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.TextBox;
import com.sksamuel.gwt.websockets.Websocket;
import com.sksamuel.gwt.websockets.WebsocketListener;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class GwtWebsocketsDemo implements EntryPoint {
  /**
   * The message displayed to the user when the server cannot be reached or
   * returns an error.
   */
  private static final String SERVER_ERROR = "An error occurred while "
      + "attempting to contact the server. Please check your network "
      + "connection and try again.";


  protected static native void _log(String text)
  /*-{
      console.log(text);
  }-*/;
  
  protected class Console {
	  public void log(String text) {
		  _log(text);
	  }
  }

  protected Console console = new Console();
  
  /**
   * This is the entry point method.
   */
  public void onModuleLoad() {
    final Button sendButton = new Button("Send");
    final TextBox nameField = new TextBox();
    nameField.setText("GWT User");
    final Label errorLabel = new Label();
    
    final Label outputLabel = new Label();
    
    final Element output = DOM.getElementById("output");
    final Element status = DOM.getElementById("status");

    final Console console = new Console();


    console.log("adding websocket");
    
    // Establish a websocket communication channel to the atmosphere chat service.
    // Websocket socket = new Websocket("ws://localhost:8080/chat?X-Atmosphere-tracking-id=5ebed4c5-0b90-4166-88b2-9f273719ab75&X-Atmosphere-Framework=2.2.1-jquery&X-Atmosphere-Transport=websocket&X-Cache-Date=1401409863002&Content-Type=application/json&X-atmo-protocol=true");
    final String url = "ws://localhost:8080/stream";
    Websocket socket = new Websocket(url);
    
    socket.addListener(new WebsocketListener() {

        @Override
        public void onClose() {
    	    // do something on close
        }

        @Override
        public void onMessage(String msg) {
	        // a message is received
        	console.log("onMessage(): " + msg);
        	outputLabel.setText("websocket " + url + ": " + msg);
        	output.setInnerText(msg);
        }

        @Override
        public void onOpen() {
	        // do something on open
        	console.log("onOpen()");
        	status.setInnerText("connected: " + url);
        }
    });
    
    socket.open();
    
    console.log("websocket is open");
    
  }
}
