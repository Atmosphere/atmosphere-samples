package org.atmosphere.samples.streamingstress;

import java.util.concurrent.atomic.AtomicInteger;

import javax.inject.Inject;

import org.atmosphere.cpr.Broadcaster;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Send twice a second a chat event to the clients.
 *
 */
@Component
public class ScheduledTask {

  private static final Logger LOGGER = LoggerFactory.getLogger(ScheduledTask.class);
  private static final AtomicInteger COUNTER = new AtomicInteger();

  @Inject
  private BroadcasterContext broadcasterContext;

  @Scheduled(fixedRate = 500)
  public void reportCurrentTime() {
    broadcast();
  }

  public void broadcast() {
    final Broadcaster broadcaster = broadcasterContext.getBroadcaster();
    if (broadcaster != null) {
      int counter = COUNTER.incrementAndGet();
      String message = "xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx" + " Message No. "
          + String.valueOf(counter);
      if (counter % 100 == 0) {
        LOGGER.info("Pushing out '{}'th message", counter);
      }

      broadcaster.broadcast(new Data("SERVER", message).toString());
    }
  }

}
