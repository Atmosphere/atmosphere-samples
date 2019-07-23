package org.atmosphere.samples.greeter.cxf.api;

import org.atmosphere.samples.greeter.cxf.model.Body;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
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

    @GET
    @Path("/v1/subscribe/{name}")
    @Produces({ "application/json" })
    public Response subscribe(final @javax.ws.rs.core.Context HttpServletResponse httpResponse,
                              @HeaderParam("X-Request-Key") String reqid, @PathParam("name") String name);

    @DELETE
    @Path("/v1/unsubscribe/{sid}")
    @Produces({ "application/json" })
    public Response unsubscribe(@HeaderParam("X-Request-Key") String reqid, @PathParam("sid") String sid);
}

