export interface SerializedError<Field extends string = string> {
  message: string;
  field?: Field;
}

export interface Errors<Field extends string = string> {
  errors: SerializedError<Field>[];
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  abstract serializeErrors(): SerializedError[];
}
