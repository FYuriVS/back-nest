import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserPayload } from './interfaces/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // throw new Error('Method not implemented.');
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email ou senha estão incorretos');
  }
}
