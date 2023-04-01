import { ObjectId } from 'mongoose';
import { IPhoto } from '../photo.interface';

export class CreatePlaceDto {
  title: string;
  owner: ObjectId;
  address: string;
  photos: IPhoto[];
  description: string;
  checkIn: string;
  checkOut: string;
  features: string[];
  price: number;
  maxGuests: number;
}
