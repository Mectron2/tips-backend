import { HttpException, HttpStatus } from '@nestjs/common';

export class BillNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: `Bill not found`,
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
