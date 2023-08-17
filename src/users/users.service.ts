import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const data = await this.findAll();

    if (data.status !== false) {
      const users = data.data?.filter((data) => {
        return (
          data.name === createUserDto.name || data.email === createUserDto.email
        );
      });

      if (users?.length !== 0) {
        return {
          status: false,
          message: 'Cliente já cadastrada na base de dados!',
        };
      }
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    await this.prisma.user.create({
      data: user,
    });

    return {
      status: true,
      message: `Usuário "${user.name}" foi cadastrado com sucesso!`,
    };
  }

  async findAll() {
    const data = await this.prisma.user.findMany();

    if (data.length == 0) {
      return {
        status: false,
        message: 'Nenhum usuário encontrado na base de dados',
      };
    } else {
      return {
        status: true,
        message: 'Listagem de usuários feita com sucesso!',
        data: data,
      };
    }
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
