import { CustomError, ValidationError } from '../types';

class RequestValidationError extends CustomError {
  readonly statusCode = 422;

  constructor(public readonly errors: readonly ValidationError[]) {
    super('Invalid request parameters');
  }

  readonly serializeErrors = () => {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  };
}

export default RequestValidationError;
