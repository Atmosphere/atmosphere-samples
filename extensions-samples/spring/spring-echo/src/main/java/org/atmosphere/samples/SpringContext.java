/*
 * Copyright 2016 Async-IO.org
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

import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResource.TRANSPORT;
import org.atmosphere.cpr.Meteor;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebMvc
@ComponentScan
public class SpringContext extends WebMvcConfigurerAdapter/* implements WebSocketConfigurer */{


	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		super.configureDefaultServletHandling(configurer);
		configurer.enable(); // so static files (html, js) will not be considered as REST resources.
	}
	
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		// see https://groups.google.com/forum/#!topic/atmosphere-framework/uZOrfXl3Bu8
		converters.add(new MappingJackson2HttpMessageConverter() {
			@Override
			protected void writeInternal(Object object, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
				outputMessage.getHeaders().setContentType(MediaType.APPLICATION_JSON);
				super.writeInternal(object, outputMessage);
			}
		});
	}
	
	@Override
	public void addArgumentResolvers(
			List<HandlerMethodArgumentResolver> argumentResolvers) {argumentResolvers.add(new HandlerMethodArgumentResolver() {
			
			@Override
			public boolean supportsParameter(MethodParameter parameter) {
				return AtmosphereResource.class.isAssignableFrom(parameter.getParameterType());
			}
			
			@Override
			public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
				
				Meteor m = Meteor.build(webRequest.getNativeRequest(HttpServletRequest.class));
			    if (m.transport() == TRANSPORT.LONG_POLLING) {
			      m.resumeOnBroadcast(true).suspend(-1);
			    }
			    else{
			    	m.suspend(-1);
			    }
			    AtmosphereResource resource = m.getAtmosphereResource();
			    return resource;
				
			}
		});
	}
}
