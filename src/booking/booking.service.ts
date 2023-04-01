import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from '../place/schemas/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async bookPlace(bookingPlaceDto: BookingDto, userId: ObjectId) {
    return this.bookingModel.create<CreateBookingDto>({
      ...bookingPlaceDto,
      userId,
    });
  }

  async findOne(id: string) {
    return this.bookingModel.findById(id).populate('place');
  }

  async findAllUserBookings(userId: ObjectId) {
    return this.bookingModel.find({ userId }).populate('place');
  }

  async findAllPlaceBookings(placeId: ObjectId) {
    return this.bookingModel.find({ placeId });
  }

  async findAllBookings() {
    return this.bookingModel.find();
  }

  async deleteOne(id: string) {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new HttpException(
        `Booking with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return deletedBooking;
  }

  async removeAll(userId: ObjectId): Promise<any> {
    return this.bookingModel.deleteMany({ userId }).exec();
  }
}
