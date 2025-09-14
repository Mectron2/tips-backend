import { CreateParticipantDto } from './dto/create-participant.dto';
import { IsArray, IsNumber } from 'class-validator';

export class CreateParticipantsRequestDto {
  @IsNumber()
  billId: number;
  @IsArray()
  createParticipantDtos: CreateParticipantDto[];
}
