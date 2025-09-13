import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillsModule } from './bills/bills.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [BillsModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
