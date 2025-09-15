import { Bill } from './entities/bill.entity';
import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { PrismaService } from '../prisma/PrismaService';
import { BillNotFoundException } from './exceptions/BillNotFoundException';

@Injectable()
export class BillsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateBillDto): Promise<Bill> {
    return this.prisma.bill.create({ data });
  }

  findAll(): Promise<Bill[]> {
    return this.prisma.bill.findMany({ include: { participants: true } });
  }

  async findOne(id: number): Promise<Bill> {
    const bill = await this.prisma.bill.findUnique({
      where: { id },
      include: { participants: true },
    });

    if (!bill) {
      throw new BillNotFoundException();
    }

    return bill;
  }

  delete(id: number) {
    return this.prisma.bill.delete({ where: { id } });
  }

  patch(id: number, data: Partial<CreateBillDto>) {
    return this.prisma.bill.update({ where: { id }, data });
  }
}
