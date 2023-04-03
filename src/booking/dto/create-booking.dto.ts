import { ObjectId } from 'mongoose';
import { IPlace } from '../../models/place.interface';

export class CreateBookingDto {
  place: IPlace;
  userId: ObjectId;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
}
