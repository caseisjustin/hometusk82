import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    UsersModule,
    AuthModule,
    ServicesModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptor,
    },
    JwtService
  ],
})
export class AppModule {}
