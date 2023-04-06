import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IPhoto } from '../photo.interface';

export type PlaceDocument = HydratedDocument<Place>;

@Schema()
export class Place {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  photos: IPhoto[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  checkIn: string;

  @Prop()
  checkOut: string;

  @Prop()
  features: string[];

  @Prop()
  maxGuests: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
