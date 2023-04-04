import { ObjectId } from 'mongoose';
import { IPhoto } from '../photo.interface';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  owner: ObjectId;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsArray()
  photos: IPhoto[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  checkIn: string;

  @IsNotEmpty()
  @IsString()
  checkOut: string;

  @IsNotEmpty()
  @IsArray()
  features: string[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  maxGuests: string;
}
