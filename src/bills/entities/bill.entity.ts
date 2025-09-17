import { Decimal } from 'generated/prisma/runtime/library';
import { Participant } from '../../participant/entities/participant.entity';
import { Currency } from '../../currency/entities/currency.entity';
import { Dish } from '../../dishes/entities/dish.entity';

export class Bill {
  id: number;
  amount: Decimal;
  tipPercent: Decimal | null;
  createdAt: Date;
  updatedAt: Date;
  currencyId: number;
  currency: Currency;
  dishId?: number | null;
  dish?: Dish | null;
  participants?: Participant[];
}
