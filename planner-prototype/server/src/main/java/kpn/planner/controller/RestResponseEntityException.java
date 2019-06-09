package kpn.planner.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.ektorp.DocumentNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;

@ControllerAdvice
public class RestResponseEntityException extends ResponseEntityExceptionHandler {

	private static final Logger logger = Logger.getLogger(ResponseEntityExceptionHandler.class.getSimpleName());

	@ExceptionHandler(value = { UnrecognizedPropertyException.class, IllegalArgumentException.class, DocumentNotFoundException.class })
	protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
		logger.log(Level.SEVERE, ex.getMessage());
		return handleExceptionInternal(ex, null, new HttpHeaders(), HttpStatus.CONFLICT, request);
	}
}