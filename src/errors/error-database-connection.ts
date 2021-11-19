import { CustomError } from '../types';

class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to Database';
  statusCode = 500;

  constructor() {
    super('Error connecting to Database');
  }

  serializeErrors = () => {
    return [
      {
        message: this.reason,
      },
    ];
  };
}

export default DatabaseConnectionError;
