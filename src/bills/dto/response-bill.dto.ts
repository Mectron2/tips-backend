import { Bill } from '../entities/bill.entity';
import { ResponseParticipantDto } from '../../participant/dto/response-participant.dto';
import { Currency } from '../../currency/entities/currency.entity';

export class ResponseBillDto {
  id: number;
  amount: number;
  amountInSpecifiedCurrency: number;
  currency: Currency;
  tipPercent: number | null;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  totalAmountInSpecifiedCurrency?: number;
  participants?: ResponseParticipantDto[];

  constructor(
    id: number,
    amount: number,
    amountInSpecifiedCurrency: number,
    currency: Currency,
    tipPercent: number | null,
    createdAt: string,
    updatedAt: string,
    participants?: ResponseParticipantDto[],
    totalAmount?: number,
    totalAmountInSpecifiedCurrency?: number,
  ) {
    this.id = id;
    this.amount = amount;
    this.amountInSpecifiedCurrency = amountInSpecifiedCurrency;
    this.currency = currency;
    this.tipPercent = tipPercent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.participants = participants;
    this.totalAmount = totalAmount;
    this.totalAmountInSpecifiedCurrency = totalAmountInSpecifiedCurrency;
  }

  static toDto(
    data: Bill,
    totalAmount?: number,
    participants?: ResponseParticipantDto[],
  ) {
    return new ResponseBillDto(
      data.id,
      Number(data.amount),
      Number(data.amount) * Number(data.currency.exchangeRate),
      data.currency,
      data.tipPercent ? Number(data.tipPercent) : null,
      data.createdAt.toISOString(),
      data.updatedAt.toISOString(),
      participants ? participants : undefined,
      totalAmount ? totalAmount : undefined,
      totalAmount && data.currency
        ? Number(data.currency.exchangeRate) * totalAmount
        : undefined,
    );
  }
}
