import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { BillsRepository } from './bills.repository';
import { PrismaService } from '../prisma/PrismaService';
import { CurrencyModule } from '../currency/currency.module';
import { DishesModule } from '../dishes/dishes.module';

@Module({
  controllers: [BillsController],
  providers: [BillsService, BillsRepository, PrismaService],
  exports: [BillsService, BillsRepository],
  imports: [CurrencyModule, DishesModule],
})
export class BillsModule {}
