import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './participant.repository';
import { InvalidParticipantCreateDataException } from './exceptions/InvalidParticipantCreateDataException';
import { ResponseParticipantDto } from './dto/response-participant.dto';
import { BillsService } from '../bills/bills.service';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly billsService: BillsService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto, billId: number) {
    const data = {
      ...createParticipantDto,
      name: createParticipantDto.name ?? 'Unknown participant',
    };

    if (data.customAmount && data.customPercent) {
      throw new InvalidParticipantCreateDataException(
        'Either customAmount or customPercent must be provided, but not both.',
      );
    }

    return this.participantRepository.create(data, billId);
  }

  // TODO: Optimize this method to reduce the number of database calls
  async createMany(
    billId: number,
    createParticipantDtos: CreateParticipantDto[],
  ) {
    const participants: Participant[] = [];

    const remainingAmountOfTips =
      await this.billsService.getRemainingAmountOfTips(billId);
    const remainingPercentOfTips =
      await this.billsService.getRemainingPercentOfTips(billId);

    let totalCustomAmount = 0;
    let totalCustomPercent = 0;

    for (const dto of createParticipantDtos) {
      if (dto.customAmount) {
        totalCustomAmount += dto.customAmount;
      }
      if (dto.customPercent) {
        totalCustomPercent += dto.customPercent;
      }
    }

    if (totalCustomAmount > remainingAmountOfTips) {
      throw new InvalidParticipantCreateDataException(
        'Total customAmount exceeds the remaining amount of tips for the bill.',
      );
    }

    if (totalCustomPercent > remainingPercentOfTips) {
      throw new InvalidParticipantCreateDataException(
        'Total customPercent exceeds the remaining percent of tips for the bill.',
      );
    }

    for (const dto of createParticipantDtos) {
      const participant = await this.create(dto, billId);
      participants.push(participant);
    }

    return participants;
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
    return this.participantRepository.deleteAllParticipantsByBillId(id);
  }
}
