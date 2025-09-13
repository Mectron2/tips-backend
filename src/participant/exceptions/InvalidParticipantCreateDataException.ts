import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParticipantCreateDataException extends HttpException {
  constructor(msg: string) {
    super(
      {
        message: `Invalid data provided for participant creation: ${msg}`,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
