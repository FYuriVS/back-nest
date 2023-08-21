import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { StoresModule } from './stores/stores.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [ClientsModule, StoresModule, CommonModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: any, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', '*'); // Substitua pela origem permitida
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
        next();
      })
      .forRoutes('*');
  }
}
