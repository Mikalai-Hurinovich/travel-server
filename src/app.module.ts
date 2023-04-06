import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PlaceModule } from './place/place.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { CorsMiddleware } from './auth/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.SERVER_URL),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    PlaceModule,
    BookingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
