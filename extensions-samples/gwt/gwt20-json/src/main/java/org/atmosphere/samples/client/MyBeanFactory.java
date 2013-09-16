/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.atmosphere.samples.client;

import com.google.web.bindery.autobean.shared.AutoBean;
import com.google.web.bindery.autobean.shared.AutoBeanFactory;

/**
 *
 * @author rinchen tenpel
 */
public interface MyBeanFactory extends AutoBeanFactory {
    AutoBean<Event> event(Event event);
}
