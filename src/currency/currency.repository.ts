import { PrismaService } from '../prisma/PrismaService';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from './entities/currency.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyRepository {
  constructor(private prisma: PrismaService) {}

  public create(data: CreateCurrencyDto): Promise<Currency> {
    return this.prisma.currency.create({ data });
  }

  public findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany();
  }

  findOne(id: number) {
    return this.prisma.currency.findUniqueOrThrow({ where: { id } });
  }

  findByCode(symbol: string) {
    return this.prisma.currency.findUnique({ where: { symbol } });
  }
}
