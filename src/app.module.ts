import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { StoresModule } from './stores/stores.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, StoresModule, CommonModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: any, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Substitua pela origem permitida
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
