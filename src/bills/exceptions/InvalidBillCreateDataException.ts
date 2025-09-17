import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBillCreateDataException extends HttpException {
  constructor(msg?: string) {
    super(
      {
        message: msg || `Invalid data provided for creating a bill`,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
