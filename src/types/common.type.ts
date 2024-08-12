export class CustomError {
  statusCode: number;
  message: string;
  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export type CustomErrorType = {
  statusCode: number;
  message: string;
};
