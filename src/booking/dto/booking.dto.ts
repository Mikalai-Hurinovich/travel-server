import { ObjectId } from 'mongoose';

export interface BookingDto {
  placeId: ObjectId;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  price: number;
  email: string;
  phone: string;
}
