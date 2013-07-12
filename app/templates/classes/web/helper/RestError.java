package <%= basePackage %>.web.helper;

import org.springframework.http.HttpStatus;

public class RestError {

	private final HttpStatus status;
	private final String message;
	private final String stackTrace;

	public RestError(HttpStatus status, String message, String stackTrace) {
		this.status = status;
		this.message = message;
		this.stackTrace = stackTrace;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	public String getStackTrace() {
		return stackTrace;
	}

}