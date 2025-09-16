import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';
import { PrismaService } from '../prisma/PrismaService';
import { BillsModule } from '../bills/bills.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [BillsModule, CurrencyModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository, PrismaService],
})
export class ParticipantModule {}
