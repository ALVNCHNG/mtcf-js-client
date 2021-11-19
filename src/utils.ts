import axios, { AxiosResponse } from 'axios';

import { ErrorResponse } from './types';

export const handleResourceError = (error: any) => {
  if (!axios.isAxiosError(error)) {
    throw new Error(error);
  }

  if (error.response && isResponseSerializedErrors(error.response.data)) {
    return error.response.data;
  }

  throw new Error(error.message);
};

export const isResponseSerializedErrors = (
  error: AxiosResponse<any, any>['data']
): error is ErrorResponse => {
  return !!(error as ErrorResponse).errors;
};

export const isErrorResponse = (error: any): error is ErrorResponse => {
  return !!(error as ErrorResponse).errors;
};
