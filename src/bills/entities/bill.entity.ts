import { Decimal } from 'generated/prisma/runtime/library';
import { Participant } from '../../participant/entities/participant.entity';
import { Currency } from '../../currency/entities/currency.entity';

export class Bill {
  id: number;
  amount: Decimal;
  tipPercent: Decimal | null;
  createdAt: Date;
  updatedAt: Date;
  currencyId: number;
  currency: Currency;
  participants?: Participant[];
}
