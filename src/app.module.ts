import { Module } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { ParticipantModule } from './participant/participant.module';
import { CurrencyModule } from './currency/currency.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [BillsModule, ParticipantModule, CurrencyModule, DishesModule],
})
export class AppModule {}
