import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantRepository } from './participant.repository';
import { InvalidParticipantCreateDataException } from './exceptions/InvalidParticipantCreateDataException';
import { ResponseParticipantDto } from './dto/response-participant.dto';
import { BillsService } from '../bills/bills.service';
import { Participant } from './entities/participant.entity';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly billsService: BillsService,
    private readonly currencyService: CurrencyService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto, billId: number) {
    const userCurrency = await this.currencyService.findOne(
      createParticipantDto.currencyId,
    );

    const data = {
      ...createParticipantDto,
      customAmount:
        createParticipantDto.customAmount &&
        createParticipantDto.customAmount / Number(userCurrency.exchangeRate),
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

    const currencies = await this.currencyService.findAll();

    const currenciesMap = currencies.reduce<
      Record<number, (typeof currencies)[number]>
    >((acc, currency) => {
      acc[currency.id] = currency;
      return acc;
    }, {});

    let totalCustomAmount = 0;
    let totalCustomPercent = 0;

    for (const dto of createParticipantDtos) {
      if (dto.customAmount) {
        totalCustomAmount +=
          dto.customAmount / Number(currenciesMap[dto.currencyId].exchangeRate);
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

  async findOne(id: number): Promise<ResponseParticipantDto> {
    const data = await this.participantRepository.findOne(id);
    return ResponseParticipantDto.toDto(data);
  }

  remove(id: number) {
    return this.participantRepository.deleteAllParticipantsByBillId(id);
  }
}
