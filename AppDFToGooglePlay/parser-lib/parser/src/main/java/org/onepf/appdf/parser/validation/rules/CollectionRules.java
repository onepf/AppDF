package org.onepf.appdf.parser.validation.rules;

import org.onepf.appdf.parser.validation.ValidationResult;
import org.onepf.appdf.parser.validation.ValidationRule;

import java.util.Collection;

import static org.onepf.appdf.parser.validation.ValidationResult.error;
import static org.onepf.appdf.parser.validation.ValidationResult.success;

/**
 * @author: nikolayivanov
 */
public class CollectionRules {


    public static <T> ValidationRule<Collection<T>> exists(ValidationRule<T> inner){
        return new ExistsRule<>(inner);
    }

    private static abstract class AbstractCollectionRule<T> implements ValidationRule<Collection<T>>{
        protected final ValidationRule<T> inner;

        protected AbstractCollectionRule(ValidationRule<T> inner) {
            this.inner = inner;
        }
    }


    private static final class ExistsRule<T> extends AbstractCollectionRule<T> {

        protected ExistsRule(ValidationRule<T> inner) {
            super(inner);
        }

        @Override
        public ValidationResult<Collection<T>> apply(Collection<T> target, String name) {
            if ( target == null ){
                return error(name + " is null");
            }
            for(T t : target){
                ValidationResult<T> result = inner.apply(t,name);
                if ( result.isSuccess()){
                    return success();
                }
            }
            return error(getConstraintDescription(name));
        }

        @Override
        public String getConstraintDescription(String name) {
            return " at least one elem of " + name + " must satisfy [" + inner.getConstraintDescription("") + "]";
        }
    }


}
