import { PrismaService } from '../prisma/PrismaService';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateParticipantDto, billId: number): Promise<Participant> {
    const data = { ...dto, billId };
    return this.prisma.participant.create({ data });
  }

  findOne(id: number): Promise<Participant> {
    return this.prisma.participant.findUniqueOrThrow({ where: { id }, include: { currency: true } });
  }

  deleteAllParticipantsByBillId(id: number) {
    return this.prisma.participant.deleteMany({ where: { billId: id } });
  }
}
