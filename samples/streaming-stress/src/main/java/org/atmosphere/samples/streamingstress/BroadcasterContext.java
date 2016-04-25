package org.atmosphere.samples.streamingstress;

import org.atmosphere.cpr.Broadcaster;
import org.springframework.stereotype.Component;

/**
 * Holds the single context for {@link ChatAtmosphereHandler} so that it can be shared between Spring's parent context
 * and atmosphere's child context.
 *
 */
@Component
public class BroadcasterContext {

  private volatile Broadcaster broadcaster;

  /**
   * Returns the {@link Broadcaster}.
   *
   * @return the {@link Broadcaster}
   */
  public Broadcaster getBroadcaster() {
    return broadcaster;
  }

  /**
   * Sets the {@link Broadcaster}.
   *
   * @param broadcaster
   *          the {@link Broadcaster}
   */
  public void setBroadcaster(final Broadcaster broadcaster) {
    this.broadcaster = broadcaster;
  }

}
