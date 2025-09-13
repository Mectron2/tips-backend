import { Bill } from '../entities/bill.entity';
import { ResponseParticipantDto } from '../../participant/dto/response-participant.dto';

export class ResponseBillDto {
  id: number;
  amount: number;
  tipPercent: number | null;
  tipAmount: number | null;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  participants?: ResponseParticipantDto[];

  constructor(
    id: number,
    amount: number,
    tipPercent: number | null,
    tipAmount: number | null,
    createdAt: string,
    updatedAt: string,
    participants?: ResponseParticipantDto[],
    totalAmount?: number,
  ) {
    this.id = id;
    this.amount = amount;
    this.tipPercent = tipPercent;
    this.tipAmount = tipAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.participants = participants;
    this.totalAmount = totalAmount;
  }

  static toDto(
    data: Bill,
    totalAmount?: number,
    participants?: ResponseParticipantDto[],
  ) {
    return new ResponseBillDto(
      data.id,
      Number(data.amount),
      data.tipPercent ? Number(data.tipPercent) : null,
      data.tipAmount ? Number(data.tipAmount) : null,
      data.createdAt.toISOString(),
      data.updatedAt.toISOString(),
      participants ? participants : undefined,
      totalAmount ? totalAmount : undefined,
    );
  }
}
