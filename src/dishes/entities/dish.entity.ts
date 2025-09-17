import { Decimal } from '@prisma/client/runtime/library';

export class Dish {
  id: number;
  name: string;
  price: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
