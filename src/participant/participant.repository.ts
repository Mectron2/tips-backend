import { PrismaService } from '../prisma/PrismaService';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateParticipantDto): Promise<Participant> {
    return this.prisma.participant.create({ data });
  }

  findAll() {
    return this.prisma.participant.findMany();
  }

  findOne(id: number) {
    return this.prisma.participant.findUniqueOrThrow({ where: { id } });
  }

  deleteAllParticipantsByBillId(id: number) {
    return this.prisma.participant.deleteMany({ where: { billId: id } });
  }
}
