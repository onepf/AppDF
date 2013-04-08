package org.onepf.appdf.parser.validation.rules;

import org.onepf.appdf.parser.validation.ValidationResult;
import org.onepf.appdf.parser.validation.ValidationRule;
import static org.onepf.appdf.parser.validation.ValidationResult.*;



/**
 * @author: nikolayivanov
 */
public class StringRules {

    public static ValidationRule<String> lessThan(int count){
        return new LessThan(count);
    }


    private static class LessThan implements ValidationRule<String> {

        private final int count;

        private LessThan(int count) {
            this.count = count;
        }

        @Override
        public ValidationResult<String> apply(String target, String name) {
            if ( target.length() > count ){
                error(getConstraintDescription(name));
            }
            return success();
        }

        @Override
        public String getConstraintDescription(String name) {
            return name + " must be no more than " + count + " symbols";
        }
    }
}
