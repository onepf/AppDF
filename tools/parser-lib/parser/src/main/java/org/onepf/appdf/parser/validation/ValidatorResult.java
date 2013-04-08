package org.onepf.appdf.parser.validation;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: nikolayivanov
 */
public class ValidatorResult {
    private List<ValidationError> errors = new ArrayList<>();

    public void addError(ValidationError error){
        errors.add(error);
    }
}
