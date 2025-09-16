import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { PrismaService } from '../prisma/PrismaService';
import { CurrencyRepository } from './currency.repository';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, PrismaService, CurrencyRepository],
  exports: [CurrencyService, CurrencyRepository],
})
export class CurrencyModule {}
