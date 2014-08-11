package org.onepf.appdf.parser.validation;

/**
 * @author: nikolayivanov
 */
public class ValidationError {

    private final String message;

    public String getMessage() {
        return message;
    }

    public ValidationError(String message) {
        this.message = message;

    }
}
