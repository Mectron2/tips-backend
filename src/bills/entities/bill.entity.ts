import { Decimal } from 'generated/prisma/runtime/library';
import { Participant } from '../../participant/entities/participant.entity';

export class Bill {
  id: number;
  amount: Decimal;
  tipPercent: Decimal | null;
  tipAmount: Decimal | null;
  createdAt: Date;
  updatedAt: Date;
  participants?: Participant[];
}
