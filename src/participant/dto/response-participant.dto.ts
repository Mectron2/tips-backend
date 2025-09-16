import { Participant } from '../entities/participant.entity';
import { Currency } from '../../currency/entities/currency.entity';

export class ResponseParticipantDto {
  id: number;
  billId: number;
  name: string;
  currency?: Currency;
  customPercent?: number;
  customAmount?: number;
  totalAmount?: number;
  totalAmountInSpecifiedCurrency?: number;
  effectivePercent?: number;

  constructor(
    id: number,
    billId: number,
    name: string,
    currency?: Currency,
    customPercent?: number,
    customAmount?: number,
    totalAmount?: number,
    totalAmountInSpecifiedCurrency?: number,
    effectivePercent?: number,
  ) {
    this.id = id;
    this.billId = billId;
    this.name = name;
    this.currency = currency;
    this.customPercent = customPercent;
    this.customAmount = customAmount;
    this.totalAmount = totalAmount;
    this.totalAmountInSpecifiedCurrency = totalAmountInSpecifiedCurrency;
    this.effectivePercent = effectivePercent;
  }

  static toDto(
    data: Participant,
    totalAmount?: number,
    effectivePercent?: number,
  ) {
    return new ResponseParticipantDto(
      data.id,
      data.billId,
      data.name ?? 'Unknown participant',
      data.currency ? data.currency : undefined,
      data.customPercent ? Number(data.customPercent) : undefined,
      data.customAmount ? Number(data.customAmount) : undefined,
      totalAmount ? totalAmount : undefined,
      data.currency && totalAmount ? (Number(data.currency.exchangeRate) * totalAmount) : undefined,
      effectivePercent ? effectivePercent : undefined,
    );
  }
}
