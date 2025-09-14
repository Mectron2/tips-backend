import { CreateParticipantDto } from './create-participant.dto';
import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantsRequestDto {
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the bill to which participants are being added',
    example: 1,
  })
  billId: number;

  @IsArray()
  @ApiProperty({
    description: 'Array of participants to be created',
    type: [CreateParticipantDto],
  })
  createParticipantDtos: CreateParticipantDto[];
}
