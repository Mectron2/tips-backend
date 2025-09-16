import { Bill } from '../entities/bill.entity';
import { ResponseParticipantDto } from '../../participant/dto/response-participant.dto';
import { Decimal } from '../../../generated/prisma/runtime/library';

export class ResponseBillDto {
  id: number;
  amount: number;
  amountInBillCurrency: number;
  tipPercent: number | null;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  participants?: ResponseParticipantDto[];

  constructor(
    id: number,
    amount: number,
    amountInBillCurrency: number,
    tipPercent: number | null,
    createdAt: string,
    updatedAt: string,
    participants?: ResponseParticipantDto[],
    totalAmount?: number,
  ) {
    this.id = id;
    this.amount = amount;
    this.amountInBillCurrency = amountInBillCurrency;
    this.tipPercent = tipPercent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.participants = participants;
    this.totalAmount = totalAmount;
  }

  static toDto(
    data: Bill,
    exchangeRate: Decimal,
    totalAmount?: number,
    participants?: ResponseParticipantDto[],
  ) {
    return new ResponseBillDto(
      data.id,
      Number(data.amount),
      Number(data.amount) * Number(exchangeRate),
      data.tipPercent ? Number(data.tipPercent) : null,
      data.createdAt.toISOString(),
      data.updatedAt.toISOString(),
      participants ? participants : undefined,
      totalAmount ? totalAmount : undefined,
    );
  }
}
