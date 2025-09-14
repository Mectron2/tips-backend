import { Module } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [BillsModule, ParticipantModule],
})
export class AppModule {}
