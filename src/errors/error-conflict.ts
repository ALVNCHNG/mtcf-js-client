import { CustomError } from '../types';

class ConflictError extends CustomError {
  statusCode = 422;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors = () => {
    return [{ message: this.message }];
  };
}

export default ConflictError;
