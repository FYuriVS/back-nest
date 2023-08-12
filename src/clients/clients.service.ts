import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientDto: Prisma.ClientCreateInput) {
    return `;his action adds a new client ${createClientDto}`;
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: Prisma.ClientUpdateInput) {
    return `This action updates a #${id} ${updateClientDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
