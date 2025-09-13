import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBillCreateDataException extends HttpException {
  constructor(msg: string) {
    super(
      {
        message: `Invalid data provided for bill creation: ${msg}`,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
