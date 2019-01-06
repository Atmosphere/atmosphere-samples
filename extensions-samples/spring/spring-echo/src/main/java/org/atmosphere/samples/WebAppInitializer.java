/*
 * Copyright 2008-2019 Async-IO.org
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
package org.atmosphere.samples;

import org.atmosphere.cpr.DefaultBroadcaster;
import org.atmosphere.cpr.MeteorServlet;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

public class WebAppInitializer implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		
	    // mvc context
	    AnnotationConfigWebApplicationContext mvcContext = new AnnotationConfigWebApplicationContext();
	    mvcContext.register(SpringContext.class);

	    // spring servlet, wrapped by atmosphere
	    Dynamic servlet = servletContext.addServlet("spring-atmosphere", new MeteorServlet(new DispatcherServlet(mvcContext), "/"));
	    servlet.setAsyncSupported(true);

	    
	    servlet.setInitParameter(org.atmosphere.cpr.ApplicationConfig.BROADCASTER_CLASS, DefaultBroadcaster.class.getName());
	    servlet.setInitParameter(org.atmosphere.cpr.ApplicationConfig.DEFAULT_CONTENT_TYPE, "application/json");
	    servlet.setInitParameter(org.atmosphere.cpr.ApplicationConfig.NO_CACHE_HEADERS, "true");
		servlet.setInitParameter(org.atmosphere.cpr.ApplicationConfig.JSR356_MAPPING_PATH, "/sprint-atmosphere");
	    
	    servlet.setLoadOnStartup(1);
	    servlet.addMapping("/");
		
	}

}
