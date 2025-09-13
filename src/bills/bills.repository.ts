import { Bill } from './entities/bill.entity';
import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { PrismaService } from '../prisma/PrismaService';

@Injectable()
export class BillsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateBillDto): Promise<Bill> {
    return this.prisma.bill.create({ data });
  }

  findAll(): Promise<Bill[]> {
    return this.prisma.bill.findMany({ include: { participants: true } });
  }

  findOne(id: number): Promise<Bill> {
    return this.prisma.bill.findUniqueOrThrow({
      where: { id },
      include: { participants: true },
    });
  }
}
