import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: Prisma.StoreCreateInput) {
    const data = await this.findAll();

    if (data) {
      const teste = data.data?.filter((data) => {
        return data.name === createStoreDto.name;
      });

      if (teste?.length !== 0) {
        return {
          status: false,
          message: 'Loja já cadastrada na base de dados!!!!!!',
        };
      }
    }

    return {
      status: true,
      message: 'Loja criada com sucesso!',
      data: await this.prisma.store.create({
        data: createStoreDto,
      }),
    };
  }

  async findAll() {
    const data = await this.prisma.store.findMany();

    if (data.length == 0) {
      return {
        status: false,
        message: 'Nenhuma loja encontrada na base de dados',
      };
    } else {
      return {
        status: true,
        message: 'Listagem de lojas feita com sucesso!',
        data: data,
      };
    }
  }

  async findOne(id?: number) {
    const data = await this.prisma.store.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      return {
        status: false,
        message: 'Loja não encontrada na base de dados',
      };
    } else {
      return {
        status: true,
        message: 'Loja encontrada com sucesso',
        data: data,
      };
    }
  }

  update(id: number, updateStoreDto: Prisma.StoreUpdateInput) {
    return this.prisma.store.update({
      data: updateStoreDto,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.store.delete({
      where: {
        id: id,
      },
    });
  }
}
