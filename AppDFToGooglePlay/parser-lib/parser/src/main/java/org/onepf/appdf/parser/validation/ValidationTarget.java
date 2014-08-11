package org.onepf.appdf.parser.validation;

/**
 * @author: nikolayivanov
 */
public class ValidationTarget<T> {

    private final ValidationRule<T> rule;
    private final T targetInstance;
    private final String name;

    public ValidationTarget(ValidationRule<T> rule, T targetInstance,String name) {
        this.rule = rule;
        this.targetInstance = targetInstance;
        this.name = name;
    }

    public ValidationResult<T> validate(){
        return rule.apply(targetInstance,name);
    }

}
