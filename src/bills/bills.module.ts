import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { BillsRepository } from './bills.repository';
import { PrismaService } from '../prisma/PrismaService';

@Module({
  controllers: [BillsController],
  providers: [BillsService, BillsRepository, PrismaService],
})
export class BillsModule {}
