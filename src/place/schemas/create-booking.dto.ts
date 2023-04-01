import { ObjectId } from 'mongoose';

export interface CreateBookingDto {
  placeId: ObjectId;
  userId: ObjectId;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
}
