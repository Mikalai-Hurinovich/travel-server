import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PlaceModule } from './place/place.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
