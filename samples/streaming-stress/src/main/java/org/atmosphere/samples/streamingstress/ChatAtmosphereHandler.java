package org.atmosphere.samples.streamingstress;

import java.io.IOException;
import java.util.Optional;

import javax.inject.Inject;

import org.atmosphere.config.service.AtmosphereHandlerService;
import org.atmosphere.cpr.AtmosphereHandler;
import org.atmosphere.cpr.AtmosphereRequest;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.cpr.AtmosphereResponse;

/**
 * Atmosphere's chat back-end.
 *
 */
@AtmosphereHandlerService(path = "/chat")
public class ChatAtmosphereHandler implements AtmosphereHandler {

  @Inject
  private BroadcasterContext broadcasterContext;

  @Override
  public void onRequest(final AtmosphereResource r) throws IOException {

    final AtmosphereRequest req = r.getRequest();
    broadcasterContext.setBroadcaster(r.getBroadcaster());

    // First, tell Atmosphere to allow bi-directional communication by suspending.
    if (req.getMethod().equalsIgnoreCase("GET")) {
      // We are using HTTP long-polling with an invite timeout
      r.suspend();
      // Second, broadcast message to all connected users.
    } else if (req.getMethod().equalsIgnoreCase("POST")) {
      r.getBroadcaster().broadcast(req.getReader().readLine().trim());
    }
  }

  @Override
  public void onStateChange(final AtmosphereResourceEvent event) throws IOException {
    final AtmosphereResource r = event.getResource();
    final AtmosphereResponse res = r.getResponse();

    if (r.isSuspended()) {
      final String body = Optional.ofNullable(event).map(m -> m.getMessage()).map(m -> m.toString()).orElse("");
      if (body.startsWith("{") && body.endsWith("}")) {

        final Data data = json2Data(body);
        res.getWriter().write(data.toString());
        switch (r.transport()) {
          case JSONP:
          case LONG_POLLING:
            event.getResource().resume();
            break;
          case STREAMING:
            res.getWriter().flush();
            break;
          case WEBSOCKET:
          default:
            break;
        }
      }
    } else if (!event.isResuming()) {
      event.broadcaster().broadcast(new Data("Someone", "say bye bye!").toString());
    }
  }

  private Data json2Data(final String body) {
    final String payload = body.replace("{", "").replace("}", "");
    final String[] keyAndValueArray = payload.split(",");
    String author = "UNKNOWN";
    String message = "UNKNOWN";
    for (final String keyAndValue : keyAndValueArray) {
      final String[] split = keyAndValue.split(":");
      final String key = split[0].replace("\"", "").trim();
      final String value = split[1].replace("\"", "").trim();

      if ("author".equals(key)) {
        author = value;
      } else if ("message".equals(key)) {
        message = value;
      }
    }
    final Data data = new Data(author, message);
    return data;
  }

  @Override
  public void destroy() {
  }

}
