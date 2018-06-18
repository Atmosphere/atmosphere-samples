package org.atmosphere.samples.greeter.cxf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
        r.setFrom(body.getName());
        r.setName(name);
        r.setText(body.getText());
        totalgreeted.incrementAndGet();
        greetedcount.incrementAndGet();

        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }

    @Override
    public Response ping() {
        System.out.printf("########## greeter ping called");
        Pong r = new Pong();
        r.setPong(count.incrementAndGet());
        return Response.ok(r, MediaType.APPLICATION_JSON).build();
    }
}
