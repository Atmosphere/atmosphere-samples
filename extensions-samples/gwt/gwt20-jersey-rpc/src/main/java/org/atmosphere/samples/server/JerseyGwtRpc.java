/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.atmosphere.samples.server;

import org.atmosphere.annotation.Suspend;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.gwt20.shared.Constants;
import org.atmosphere.samples.client.RPCEvent;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import java.util.logging.Logger;


@Path("/jersey/rpc")
public class JerseyGwtRpc {
    
    private final static Logger logger = Logger.getLogger(JerseyGwtRpc.class.getName());
    
    @GET    
    @Suspend
    @Produces(Constants.GWT_RPC_MEDIA_TYPE)
    public String connect(@Context AtmosphereResource ar) {
        logger.info("Suspending Jersey GWT RPC request");
        return "";
    }
    
    @POST
    @Consumes(Constants.GWT_RPC_MEDIA_TYPE)
    public void receive(RPCEvent event, @Context Broadcaster b) {
        logger.info("Received RPC event on Jersey: " + event.getData());
        b.broadcast(event);
    }
    
    
}
