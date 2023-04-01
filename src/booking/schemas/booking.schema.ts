import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IPlace } from '../../models/place.interface';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Place' })
  place: IPlace;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: ObjectId;
  @Prop({ required: true })
  checkIn: string;
  @Prop({ required: true })
  checkOut: string;
  @Prop({ required: true })
  guests: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
