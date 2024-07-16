package org.atmosphere.samples.chat;

import org.eclipse.jetty.ee10.servlet.DefaultServlet;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.servlet.ServletHolder;
import org.eclipse.jetty.ee10.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.util.resource.ResourceFactory;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

public class EmbeddedJettyWebSocketChat {
    private static final Logger log = LoggerFactory.getLogger(EmbeddedJettyWebSocketChat.class);

    public static void main(String[] args) throws Exception {
        new EmbeddedJettyWebSocketChat().run();
    }

    private void run() throws Exception {
        Server server = new Server();
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(8080);
        server.addConnector(connector);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");

        Path resourceBasePath = Paths.get("/Users/jeanfrancoisarcand/workspace/w_atmopshere/atmosphere-samples/samples/embedded-jetty-websocket-chat/target/webapp");
        context.setBaseResource(ResourceFactory.root().newResource(resourceBasePath.toUri()));

        // Add DefaultServlet to serve static content
        ServletHolder defaultServlet = new ServletHolder("default", DefaultServlet.class);
        defaultServlet.setInitParameter("dirAllowed", "true");
        defaultServlet.setInitParameter("welcomeServlets", "true");
        defaultServlet.setInitParameter("redirectWelcome", "true");
        context.addServlet(defaultServlet, "/*");

        // Add AtmosphereServlet
        ServletHolder atmosphereServlet = new ServletHolder(AtmosphereServlet.class);
        atmosphereServlet.setInitParameter(ApplicationConfig.ANNOTATION_PACKAGE, "org.atmosphere.samples.chat");
        atmosphereServlet.setInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
        atmosphereServlet.setAsyncSupported(true);
        context.addServlet(atmosphereServlet, "/chat/*");

        // Configure WebSocket
        JakartaWebSocketServletContainerInitializer.configure(context, null);

        server.setHandler(context);

        log.info("Resource base: {}", context.getBaseResource());
        log.info("Resource base exists: {}", context.getBaseResource().exists());
        Path indexPath = resourceBasePath.resolve("index.html");
        log.info("index.html exists: {}", Files.exists(indexPath));
        if (Files.exists(indexPath)) {
            log.info("index.html content:\n{}", Files.readString(indexPath));
        } else {
            log.warn("index.html not found at {}", indexPath);
        }
        log.info("Default servlet path spec: /*");
        log.info("Atmosphere servlet path spec: /chat/*");
        log.info("WebSocket support added");

        server.start();
        log.info("Server started on port {}", connector.getPort());
        server.join();
    }
}