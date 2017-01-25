package org.atmosphere.samples.streamingstress;

import java.util.Date;

/**
 * Data object.
 *
 */
public class Data {

  private final String message;
  private final String author;

  public Data(final String author, final String message) {
    this.author = author;
    this.message = message;
  }

  @Override
  public String toString() {
    final String result = "{ \"message\" : \"" + message + "\", \"author\" : \"" + author + "\" , \"time\" : "
        + new Date().getTime() + "}";
    return result;
  }
}
