import { Decimal } from 'generated/prisma/runtime/library';
import { Currency } from '../../currency/entities/currency.entity';

export class Participant {
  id: number;
  billId: number;
  name: string | null;
  currencyId: number;
  currency?: Currency;
  customPercent: Decimal | null;
  customAmount: Decimal | null;
}
