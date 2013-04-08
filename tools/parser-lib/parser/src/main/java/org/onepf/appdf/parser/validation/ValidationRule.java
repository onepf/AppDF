package org.onepf.appdf.parser.validation;

/**
 * @author: nikolayivanov
 */
public interface ValidationRule<T> {

    ValidationResult<T> apply(T target,String name);

    String getConstraintDescription(String name);
}
