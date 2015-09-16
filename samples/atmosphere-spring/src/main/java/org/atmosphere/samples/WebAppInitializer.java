package org.atmosphere.samples;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.atmosphere.cpr.DefaultBroadcaster;
import org.atmosphere.cpr.MeteorServlet;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

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
	    
	    servlet.setLoadOnStartup(1);
	    servlet.addMapping("/");
		
	}

}
