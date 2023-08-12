import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { StoresModule } from './stores/stores.module';
import { CommonModule } from './common/common.module';
import { FirebaseService } from './auth/firebase/firebase.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, StoresModule, CommonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
