/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationError =
  | {
      param: '_error';
      msg: any;
      nestedErrors: ValidationError[];
      location?: undefined;
      value?: undefined;
    }
  | {
      location: 'body' | 'cookies' | 'headers' | 'params' | 'query';
      param: string;
      value: any;
      msg: any;
      nestedErrors?: unknown[] | undefined;
    };
