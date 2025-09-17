import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/PrismaService';
import { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDishDto) {
    return this.prisma.dish.create({ data });
  }

  findAll() {
    return this.prisma.dish.findMany();
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({ where: { id } });
  }
}