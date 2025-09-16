import { HttpException, HttpStatus } from '@nestjs/common';

export class CurrencyNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: `Currency not found`,
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
