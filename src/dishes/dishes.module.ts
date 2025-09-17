import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DishesRepository } from './dishes.repository';
import { PrismaService } from '../prisma/PrismaService';

@Module({
  controllers: [DishesController],
  providers: [DishesService, DishesRepository, PrismaService],
  exports: [DishesService],
})
export class DishesModule {}
