package org.onepf.appdf.parser.validation.rules;

import org.onepf.appdf.parser.validation.ValidationResult;
import org.onepf.appdf.parser.validation.ValidationRule;


/**
 * @author: nikolayivanov
 */
public class LogicRules {

    public static <T> ValidationRule<T> and(ValidationRule<T> left,ValidationRule<T> right){
        return new AndRule<>(left,right);
    }

    public static class AndRule<T> implements ValidationRule<T>{

        private final ValidationRule<T> left;
        private final ValidationRule<T> right;

        public AndRule(ValidationRule<T> left, ValidationRule<T> right) {
            this.left = left;
            this.right = right;
        }


        @Override
        public ValidationResult<T> apply(T target, String name) {
            ValidationResult<T> lResult = left.apply(target, name);
            if ( lResult.isSuccess()){
                return right.apply(target,name);
            }else {
                return lResult;
            }
        }

        @Override
        public String getConstraintDescription(String name) {
            return left.getConstraintDescription(name) + " and " + right.getConstraintDescription(name);
        }
    }
}
