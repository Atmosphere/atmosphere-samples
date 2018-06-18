package org.atmosphere.samples.greeter.cxf.api;

import org.atmosphere.samples.greeter.cxf.model.EchoReply;
import org.atmosphere.samples.greeter.cxf.model.GreetingStatus;
import org.atmosphere.samples.greeter.cxf.model.GreetingSummary;
import org.atmosphere.samples.greeter.cxf.model.GreetingReply;
import org.atmosphere.samples.greeter.cxf.model.Body;
import org.atmosphere.samples.greeter.cxf.model.Pong;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import org.apache.cxf.jaxrs.ext.multipart.*;

@Path("/")
public interface DefaultApi  {
    @POST
    @Path("/v1/echo")
    @Consumes({ "text/plain" })
    @Produces({ "application/json" })
    public Response echo(String body);
    @GET
    @Path("/v1/greet/{name}")
    
    @Produces({ "application/json" })
    public Response getGreetStatus(@PathParam("name") String name);
    @GET
    @Path("/v1/greet")
    
    @Produces({ "application/json" })
    public Response getGreetSummary();
    @POST
    @Path("/v1/greet/{name}")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Response greet(@PathParam("name") String name,Body body);
    @GET
    @Path("/v1/ping")
    
    @Produces({ "application/json" })
    public Response ping();
}

