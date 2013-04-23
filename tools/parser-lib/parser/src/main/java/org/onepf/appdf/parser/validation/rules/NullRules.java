package org.onepf.appdf.parser.validation.rules;

import org.onepf.appdf.parser.validation.ValidationResult;
import org.onepf.appdf.parser.validation.ValidationRule;

import static org.onepf.appdf.parser.validation.ValidationResult.error;
import static org.onepf.appdf.parser.validation.ValidationResult.success;

/**
 * @author: nikolayivanov
 */
public class NullRules {

    public static <T> ValidationRule<T> notNull(){
        return new NotNullRule<>();
    }
    public static class NotNullRule<T> implements ValidationRule<T> {

        @Override
        public ValidationResult<T> apply(T target, String name) {
            final ValidationResult<T> validationResult;
            if ( target == null ){
                validationResult = error(getConstraintDescription(name));
            }else{
                validationResult = success();
            }
            return validationResult;
        }

        @Override
        public String getConstraintDescription(String name) {
            return name + " must be not null value";
        }
    }
}
