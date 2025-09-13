import { Decimal } from 'generated/prisma/runtime/library';

export class Participant {
  id: number;
  billId: number;
  name: string | null;
  customPercent: Decimal | null;
  customAmount: Decimal | null;
}
