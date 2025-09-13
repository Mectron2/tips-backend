import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillsRepository } from './bills.repository';
import { Bill } from './entities/bill.entity';
import { InvalidBillCreateDataException } from './exceptions/InvalidBillCreateDataException';
import { ResponseParticipantDto } from '../participant/dto/response-participant.dto';
import { Participant } from '../participant/entities/participant.entity';
import { ResponseBillDto } from './dto/response-bill.dto';

@Injectable()
export class BillsService {
  constructor(private readonly billsRepository: BillsRepository) {}

  create(createBillDto: CreateBillDto): Promise<Bill> {
    if (
      (createBillDto.tipAmount && createBillDto.tipPercent) ||
      (!createBillDto.tipAmount && !createBillDto.tipPercent)
    ) {
      throw new InvalidBillCreateDataException(
        'Provide either tipAmount or tipPercent, not both.',
      );
    }

    return this.billsRepository.create(createBillDto);
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
    const { withCustomPercent, withoutCustomPercent } =
      this.partitionParticipants(participants);

    if (withCustomPercent.length === 0) {
      return this.distributeEqualShares(participants, totalTipsAmount);
    }

    return this.distributeCustomShares(
      withCustomPercent,
      withoutCustomPercent,
      totalTipsAmount,
    );
  }

  private partitionParticipants(participants: Participant[]) {
    return participants.reduce(
      (acc, participant) => {
        if (participant.customPercent) {
          acc.withCustomPercent.push(participant);
        } else {
          acc.withoutCustomPercent.push(participant);
        }
        return acc;
      },
      {
        withCustomPercent: [] as Participant[],
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
    withoutCustomPercent: Participant[],
    totalTipsAmount: number,
  ): ResponseParticipantDto[] {
    const totalCustomPercent = withCustomPercent.reduce(
      (sum, p) => sum + Number(p.customPercent || 0),
      0,
    );

    const customPercentDtos = withCustomPercent.map((participant) => {
      const customPercent = Number(participant.customPercent);
      return ResponseParticipantDto.toDto(
        participant,
        totalTipsAmount * customPercent,
        customPercent,
      );
    });

    if (withoutCustomPercent.length === 0) {
      return customPercentDtos;
    }

    const remainingPercent = 1 - totalCustomPercent;
    const perPersonPercent = remainingPercent / withoutCustomPercent.length;

    const remainingDtos = withoutCustomPercent.map((participant) =>
      ResponseParticipantDto.toDto(
        participant,
        totalTipsAmount * perPersonPercent,
        perPersonPercent,
      ),
    );

    return [...customPercentDtos, ...remainingDtos];
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    console.log(updateBillDto);
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
