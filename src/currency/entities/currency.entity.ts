import { Decimal } from 'generated/prisma/runtime/library';

export class Currency {
  id: number;
  name: string;
  symbol: string;
  exchangeRate: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
