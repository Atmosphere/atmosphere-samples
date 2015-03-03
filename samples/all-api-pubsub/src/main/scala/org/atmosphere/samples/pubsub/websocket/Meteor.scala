/*
 * Copyright 2015 Async-IO.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.atmosphere.samples.pubsub.websocket

import javax.servlet.http.{HttpServletResponse, HttpServletRequest, HttpServlet}
import org.atmosphere.cpr._

class Meteor extends HttpServlet {

  override def doGet(req: HttpServletRequest, res: HttpServletResponse): Unit = {
    val m:  org.atmosphere.cpr.Meteor = org.atmosphere.cpr.Meteor.build(req)
    m.addListener(new Console)
    val factory : BroadcasterFactory = m.getAtmosphereResource.getAtmosphereConfig.getBroadcasterFactory

    res.setContentType("text/html;charset=ISO-8859-1")
    val b: Broadcaster = lookupBroadcaster(factory, req.getPathInfo)
    m.setBroadcaster(b)

    if (req.getHeader(HeaderConfig.X_ATMOSPHERE_TRANSPORT).equalsIgnoreCase(HeaderConfig.LONG_POLLING_TRANSPORT)) {
      req.setAttribute(ApplicationConfig.RESUME_ON_BROADCAST, true)
      m.suspend(-1)
    }
  }

  override def doPost(req: HttpServletRequest, res: HttpServletResponse): Unit = {
    val factory : BroadcasterFactory = req.asInstanceOf[AtmosphereRequest].resource().getAtmosphereConfig.getBroadcasterFactory
    val b: Broadcaster = lookupBroadcaster(factory, req.getPathInfo)
    val message: String = req.getReader.readLine
    if (message != null && message.indexOf("message") != -1) {
      b.broadcast(message.substring("message=".length))
    }
  }

  /**
   * Retrieve the {@link Broadcaster} based on the request's path info.
   *
   * @param pathInfo
   * @return the {@link Broadcaster} based on the request's path info.
   */
  private[pubsub] def lookupBroadcaster(factory : BroadcasterFactory, pathInfo: String): Broadcaster = {
    val decodedPath: Array[String] = pathInfo.split("/")
    val b: Broadcaster = factory.lookup(decodedPath(decodedPath.length - 1), true)
    return b
  }

}