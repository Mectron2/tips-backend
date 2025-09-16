import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillsRepository } from './bills.repository';
import { Bill } from './entities/bill.entity';
import { ResponseParticipantDto } from '../participant/dto/response-participant.dto';
import { Participant } from '../participant/entities/participant.entity';
import { ResponseBillDto } from './dto/response-bill.dto';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class BillsService {
  constructor(
    private readonly billsRepository: BillsRepository,
    private readonly currencyService: CurrencyService,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const billCurrency = await this.currencyService.findOne(
      createBillDto.currencyId,
    );
    const data = {
      ...createBillDto,
      amount: createBillDto.amount / Number(billCurrency.exchangeRate),
    };
    return this.billsRepository.create(data);
  }

  async findAll(): Promise<Bill[]> {
    return this.billsRepository.findAll();
  }

  async findOne(id: number) {
    const bill = await this.billsRepository.findOne(id);

    const { participants, amount, tipPercent } = bill;

    const totalTipsAmount = Number(amount) * Number(tipPercent);
    const totalBillAmount = Number(amount) + totalTipsAmount;

    if (!participants || participants.length === 0 || totalTipsAmount === 0) {
      return ResponseBillDto.toDto(bill, totalBillAmount);
    }

    const participantDtos = this.calculateParticipantShares(
      participants || [],
      totalTipsAmount,
    );
    return ResponseBillDto.toDto(bill, totalBillAmount, participantDtos);
  }

  private calculateParticipantShares(
    participants: Participant[],
    totalTipsAmount: number,
  ): ResponseParticipantDto[] {
    const { withCustomPercent, withCustomAmount, withoutCustomPercent } =
      this.partitionParticipants(participants);

    if (withCustomPercent.length === 0 && withCustomAmount.length === 0) {
      return this.distributeEqualShares(participants, totalTipsAmount);
    }

    return this.distributeCustomShares(
      withCustomPercent,
      withCustomAmount,
      withoutCustomPercent,
      totalTipsAmount,
    );
  }

  private partitionParticipants(participants: Participant[]) {
    return participants.reduce(
      (acc, participant) => {
        if (participant.customPercent) {
          acc.withCustomPercent.push(participant);
        } else if (participant.customAmount) {
          acc.withCustomAmount.push(participant);
        } else {
          acc.withoutCustomPercent.push(participant);
        }
        return acc;
      },
      {
        withCustomPercent: [] as Participant[],
        withCustomAmount: [] as Participant[],
        withoutCustomPercent: [] as Participant[],
      },
    );
  }

  private distributeEqualShares(
    participants: Participant[],
    totalTipsAmount: number,
  ): ResponseParticipantDto[] {
    const perPersonTip = totalTipsAmount / participants.length;
    const perPersonPercent = 1 / participants.length;

    return participants.map((participant) =>
      ResponseParticipantDto.toDto(participant, perPersonTip, perPersonPercent),
    );
  }

  private distributeCustomShares(
    withCustomPercent: Participant[],
    withCustomAmount: Participant[],
    withoutCustomPercent: Participant[],
    totalTipsAmount: number,
  ): ResponseParticipantDto[] {
    const totalCustomPercent = withCustomPercent.reduce(
      (sum, p) => sum + Number(p.customPercent || 0),
      0,
    );

    const totalCustomAmount = withCustomAmount.reduce(
      (sum, p) => sum + Number(p.customAmount || 0),
      0,
    );

    const remainingTipsAmount = totalTipsAmount - totalCustomAmount;
    const customPercentsOrAmountsDtos: ResponseParticipantDto[] = [];

    const customPercentDtos = withCustomPercent.map((participant) => {
      const customPercent = Number(participant.customPercent);
      return ResponseParticipantDto.toDto(
        participant,
        remainingTipsAmount * customPercent,
        (remainingTipsAmount * customPercent) / totalTipsAmount,
      );
    });

    const customAmountDtos = withCustomAmount.map((participant) =>
      ResponseParticipantDto.toDto(
        participant,
        Number(participant.customAmount),
        Number(participant.customAmount) / totalTipsAmount,
      ),
    );

    customPercentsOrAmountsDtos.push(...customPercentDtos, ...customAmountDtos);

    if (withoutCustomPercent.length === 0) {
      return customPercentsOrAmountsDtos;
    }

    const remainingPercent = 1 - totalCustomPercent;
    const perPersonPercent = remainingPercent / withoutCustomPercent.length;

    const remainingDtos = withoutCustomPercent.map((participant) =>
      ResponseParticipantDto.toDto(
        participant,
        remainingTipsAmount * perPersonPercent,
        (remainingTipsAmount * perPersonPercent) / totalTipsAmount,
      ),
    );

    return [...customPercentsOrAmountsDtos, ...remainingDtos];
  }

  public async getRemainingAmountOfTips(billId: number) {
    const bill = await this.billsRepository.findOne(billId);
    const tipsLimit = Number(bill.amount) * Number(bill.tipPercent);
    const paidTips = bill.participants
      ? bill.participants.reduce((sum, p) => {
          return sum + (p.customAmount ? Number(p.customAmount) : 0);
        }, 0)
      : 0;
    return tipsLimit - paidTips;
  }

  public async getRemainingPercentOfTips(billId: number) {
    const tipsLimit = 1;
    const bill = await this.billsRepository.findOne(billId);
    const paidTips = bill.participants
      ? bill.participants.reduce((sum, p) => {
          return sum + (p.customPercent ? Number(p.customPercent) : 0);
        }, 0)
      : 0;
    return tipsLimit - paidTips;
  }

  public remove(id: number) {
    return this.billsRepository.delete(id);
  }

  public async patch(id: number, data: Partial<CreateBillDto>) {
    if (data.amount) {
      const billCurrency = data.currencyId
        ? await this.currencyService.findOne(data.currencyId)
        : await this.currencyService.findByCode('USD');

      data.amount = data.amount / Number(billCurrency.exchangeRate);
    }

    return this.billsRepository.patch(id, data);
  }
}
