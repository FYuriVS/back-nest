import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: Prisma.ClientCreateInput) {
    const data = await this.findAll();

    if (data) {
      const teste = data.data?.filter((data) => {
        return (
          data.name === createClientDto.name ||
          data.document === createClientDto.document ||
          data.phone === createClientDto.phone
        );
      });

      if (teste?.length !== 0) {
        return {
          status: false,
          message: 'Cliente já cadastrada na base de dados!',
        };
      }
    }

    return {
      status: true,
      message: 'Cliente registrado com sucesso!',
      data: await this.prisma.client.create({
        data: createClientDto,
      }),
    };
  }

  async findAll() {
    const data = await this.prisma.client.findMany();

    if (data.length == 0) {
      return {
        status: false,
        message: 'Nenhum cliente encontrado na base de dados',
      };
    } else {
      return {
        status: true,
        message: 'Listagem de clientes feita com sucesso!',
        data: data,
      };
    }
  }

  async findOne(id: number) {
    const data = await this.prisma.client.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      return {
        status: false,
        message: 'Cliente não encontrado na base de dados',
      };
    } else {
      return {
        status: true,
        message: 'Cliente encontrado com sucesso',
        data: data,
      };
    }
  }

  update(id: number, updateClientDto: Prisma.ClientUpdateInput) {
    return this.prisma.client.update({
      data: updateClientDto,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.client.delete({
      where: {
        id: id,
      },
    });
  }
}
