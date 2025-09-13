import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './participant.repository';
import { InvalidParticipantCreateDataException } from './exceptions/InvalidParticipantCreateDataException';
import { ResponseParticipantDto } from './dto/response-participant.dto';
import { BillsService } from '../bills/bills.service';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly billsService: BillsService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const data = {
      ...createParticipantDto,
      name: createParticipantDto.name ?? 'Unknown participant',
    };

    const remainingAmountOfTips =
      await this.billsService.getRemainingAmountOfTips(data.billId);
    const remainingPercentOfTips =
      await this.billsService.getRemainingPercentOfTips(data.billId);

    if (
      (data.customAmount && data.customAmount > remainingAmountOfTips) ||
      (data.customPercent && data.customPercent > remainingPercentOfTips)
    ) {
      throw new InvalidParticipantCreateDataException(
        'customAmount or customPercent exceeds the remaining amount or percent of tips for the bill.',
      );
    }

    if (data.customAmount && data.customPercent) {
      throw new InvalidParticipantCreateDataException(
        'Either customAmount or customPercent must be provided, but not both.',
      );
    }

    return this.participantRepository.create(data);
  }

  findAll() {
    return `This action returns all participant`;
  }

  async findOne(id: number): Promise<ResponseParticipantDto> {
    const data = await this.participantRepository.findOne(id);
    return ResponseParticipantDto.toDto(data);
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    console.log(updateParticipantDto);
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
