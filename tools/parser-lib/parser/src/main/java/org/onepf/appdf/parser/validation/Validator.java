package org.onepf.appdf.parser.validation;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: nikolayivanov
 */
public final class Validator {

    public static class Builder {
        private List<ValidationTarget> targets = new ArrayList<>();

        public Builder target(ValidationTarget target){
            targets.add(target);
            return this;
        }

        public <T> Builder target(String targetName,T target,ValidationRule<T> rule){
            targets.add(new ValidationTarget<>(rule,target,targetName));
            return this;
        }

        public Validator build(){
            return new Validator(targets);
        }
    }

    public static Builder builder() {
        return new Builder();
    }

    private final List<ValidationTarget> targets;

    private Validator(List<ValidationTarget> targets) {
        this.targets = targets;
    }

    public List<ValidationResult> validate(){
        List<ValidationResult> results = new ArrayList<>();
        for(ValidationTarget target : targets){
            ValidationResult validate = target.validate();
            if ( !validate.isSuccess()){
                results.add(validate);
            }
        }
        return results;
    }
}
