package org.onepf.appdf.parser.validation;

/**
 * @author: nikolayivanov
 */
public abstract class ValidationResult<T> {

    private static final class Success<T> extends ValidationResult<T>{
    }

    private static final class Error<T> extends ValidationResult<T>{
        private final String errorMessage;

        private Error(String errorMessage) {
            this.errorMessage = errorMessage;
        }

        @Override
        public boolean isSuccess() {
            return false;
        }

        @Override
        public String getErrorMessage() {
            return this.errorMessage;
        }
    }

    public static <T> ValidationResult<T> success(){
        return new Success<>();
    }

    public static <T> ValidationResult<T> error(String reason){
        return new Error<>(reason);
    }

    public boolean isSuccess(){
        return true;
    }

    public String getErrorMessage(){
        throw new UnsupportedOperationException();
    }


}
