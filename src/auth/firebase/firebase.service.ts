import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  async verifyToken(token: string): Promise<boolean> {
    return true;
  }
}
