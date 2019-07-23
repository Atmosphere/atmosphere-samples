package org.atmosphere.samples.greeter.cxf;

import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.atmosphere.samples.greeter.cxf.api.DefaultApi;
import org.atmosphere.samples.greeter.cxf.model.Body;
import org.atmosphere.samples.greeter.cxf.model.EchoReply;
import org.atmosphere.samples.greeter.cxf.model.GreetingReply;
import org.atmosphere.samples.greeter.cxf.model.GreetingStatus;
import org.atmosphere.samples.greeter.cxf.model.GreetingSummary;
import org.atmosphere.samples.greeter.cxf.model.Pong;

public class DefaultGreeter implements DefaultApi {
    private AtomicInteger count = new AtomicInteger();
    private AtomicInteger totalgreeted = new AtomicInteger();
    private Map<String, AtomicInteger> greeted = new HashMap<String, AtomicInteger>();
    private Map<String, greetingSubscription> subscriptions = new ConcurrentHashMap<String, greetingSubscription>();
    // workaround to write multiple responses directly, ideally we should have an object writer API to hide this part.
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Response echo(String body) {
        EchoReply r = new EchoReply();
        r.setEcho(body);
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response getGreetStatus(String name) {
        GreetingStatus r = new GreetingStatus();
        r.setName(name);
        AtomicInteger greetedcount = greeted.get(name);
        r.setCount(greetedcount == null ? 0 : greetedcount.get());
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response getGreetSummary() {
        GreetingSummary r = new GreetingSummary();
        r.setTotal(totalgreeted.get());
        r.setGreeted(new ArrayList<String>(greeted.keySet()));
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response greet(String name, Body body) {
        AtomicInteger greetedcount;
        synchronized (greeted) {
            greetedcount = greeted.get(name);
            if (greetedcount == null) {
                greetedcount = new AtomicInteger();
                greeted.put(name, greetedcount);
            }
        }
        GreetingReply r = new GreetingReply();
        r.setFrom(name);
        r.setName(body.getName());
        r.setText(body.getText());
        totalgreeted.incrementAndGet();
        greetedcount.incrementAndGet();

        try {
            byte[] rjson = mapper.writeValueAsBytes(r);
            for (Iterator<greetingSubscription> it = subscriptions.values().iterator(); it.hasNext(); ) {
                greetingSubscription subscription = it.next();
                if ("*".equals(body.getName()) || subscription.name.equals(body.getName())) {
                    try {
                        subscription.response.getOutputStream().write(rjson);
                        subscription.response.getOutputStream().flush();
                    } catch (IOException e) {
                        it.remove();
                    }
                }
            }
        } catch (JsonProcessingException e) {
            // not expected
        }

        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response ping() {
        Pong r = new Pong();
        r.setPong(count.incrementAndGet());
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response subscribe(final HttpServletResponse httpResponse, String reqid, String name) {
        if (reqid == null) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), "No request key found").build();
        }
        subscriptions.put(reqid, new greetingSubscription(name, httpResponse));
        List<GreetingReply> r = new ArrayList<GreetingReply>();
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response unsubscribe(String reqid, String sid) {
        if (reqid == null) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), "No request key found").build();
        }
        String unsubid = reqid.split("#")[0] + "#" + sid;
        subscriptions.remove(unsubid);
        GreetingSummary r = new GreetingSummary();
        r.setTotal(totalgreeted.get());
        r.setGreeted(new ArrayList<String>(greeted.keySet()));
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    class greetingSubscription {
        String name;
        HttpServletResponse response;
        public greetingSubscription(String name, HttpServletResponse response) {
            this.name = name;
            this.response = response;
        }
    }
}
