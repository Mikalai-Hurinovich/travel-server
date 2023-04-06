import { ObjectId } from 'mongoose';

export interface IPhoto {
  id: ObjectId;
  main: boolean;
  path: string;
}
