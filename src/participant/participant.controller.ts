import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { CreateParticipantsRequestDto } from './create-participants-request.dto';

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

  @Get()
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete('/bill/:id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
