package org.atmosphere.samples.streamingstress;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.atmosphere.cpr.AtmosphereServlet;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Spring configuration (replaces traditional web.xml).
 *
 */
@Configuration
public class AppConfiguration extends WebMvcConfigurerAdapter implements ServletContextInitializer {

  @Bean
  public AtmosphereServlet atmosphereServlet() {
    return new AtmosphereServlet();
  }

  @Override
  public void onStartup(final ServletContext servletContext) throws ServletException {
    configureAtmosphere(atmosphereServlet(), servletContext);
  }

  @Override
  public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    // No cache control response headers.
    registry.addResourceHandler("/static/public/**").addResourceLocations("classpath:/static/public/")
        .setCachePeriod(0);
  }

  private void configureAtmosphere(final AtmosphereServlet servlet, final ServletContext servletContext) {
    final ServletRegistration.Dynamic reg = servletContext.addServlet("atmosphereServlet", servlet);

    reg.setInitParameter("org.atmosphere.cpr.packages", "org.atmosphere.samples");
    reg.setInitParameter("org.atmosphere.interceptor.HeartbeatInterceptor.clientHeartbeatFrequencyInSeconds", "10");
    servletContext.addListener(new org.atmosphere.cpr.SessionSupport());
    reg.addMapping("/chat/*");
    reg.setLoadOnStartup(0);
    reg.setAsyncSupported(true);
  }
}
