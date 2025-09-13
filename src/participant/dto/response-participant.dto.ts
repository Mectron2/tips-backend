import { Participant } from '../entities/participant.entity';

export class ResponseParticipantDto {
  id: number;
  billId: number;
  name: string;
  customPercent?: number;
  customAmount?: number;
  totalAmount?: number;
  totalPercent?: number;

  constructor(
    id: number,
    billId: number,
    name: string,
    customPercent?: number,
    customAmount?: number,
    totalAmount?: number,
    totalPercent?: number,
  ) {
    this.id = id;
    this.billId = billId;
    this.name = name;
    this.customPercent = customPercent;
    this.customAmount = customAmount;
    this.totalAmount = totalAmount;
    this.totalPercent = totalPercent;
  }

  static toDto(data: Participant, totalAmount?: number, totalPercent?: number) {
    return new ResponseParticipantDto(
      data.id,
      data.billId,
      data.name ?? 'Unknown participant',
      data.customPercent ? Number(data.customPercent) : undefined,
      data.customAmount ? Number(data.customAmount) : undefined,
      totalAmount ? totalAmount : undefined,
      totalPercent ? totalPercent : undefined,
    );
  }
}
