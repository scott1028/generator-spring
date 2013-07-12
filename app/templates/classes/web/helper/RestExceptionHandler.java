package <%= basePackage %>.web.helper;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import <%= corePackage %>.data.RecordNotFoundException;

@Component
public class RestExceptionHandler extends AbstractHandlerExceptionResolver {

	private static final Logger LOG = LoggerFactory.getLogger(RestExceptionHandler.class);

	@Value("${spring.profiles.active}") private String profile;
	
	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

		HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
		
		HttpStatus status;
		if(ex instanceof RecordNotFoundException){
			status = HttpStatus.NOT_FOUND;
		}
		else{
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		response.setStatus(status.value());
		
		StringWriter errors = new StringWriter();
		ex.printStackTrace(new PrintWriter(errors));
		RestError error = new RestError(status, ex.getMessage(), !profile.equalsIgnoreCase("prod") && !profile.equalsIgnoreCase("stage") ? errors.toString() : "");

		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();

		try {
			converter.write(error, MediaType.APPLICATION_JSON, outputMessage);
		} catch (IOException e) {
			LOG.error(ex.getMessage());
		}

		return new ModelAndView();
	}
}
