import { Module } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { ParticipantModule } from './participant/participant.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [BillsModule, ParticipantModule, CurrencyModule],
})
export class AppModule {}
