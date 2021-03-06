import { CustomError } from '../types';

class NotFoundError extends CustomError {
  message = 'Resource not found';

  statusCode = 404;

  constructor(message?: string) {
    super(message);

    if (message) {
      this.message = message;
    }
  }

  serializeErrors = () => {
    return [
      {
        message: this.message,
      },
    ];
  };
}

export default NotFoundError;
