import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantsRequestDto } from './dto/create-participants-request.dto';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() createParticipantRequest: CreateParticipantsRequestDto) {
    return this.participantService.createMany(
      createParticipantRequest.billId,
      createParticipantRequest.createParticipantDtos,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Delete('/bill/:id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
