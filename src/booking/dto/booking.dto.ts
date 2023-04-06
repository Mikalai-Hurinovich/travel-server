import { ObjectId } from 'mongoose';
import { IPlace } from '../../models/place.interface';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class BookingDto {
  @IsNotEmpty()
  readonly place: IPlace;

  @IsNotEmpty()
  @IsString()
  readonly checkIn: string;

  @IsNotEmpty()
  @IsString()
  readonly checkOut: string;

  @IsNotEmpty()
  @IsString()
  readonly guests: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: ObjectId;
}
