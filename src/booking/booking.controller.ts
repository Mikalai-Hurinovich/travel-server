import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { BookingService } from './booking.service';
import { ObjectId } from 'mongoose';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/bookings/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('/user-bookings')
  findAllUserBookings(@Headers('id') id: ObjectId) {
    return this.bookingService.findAllUserBookings(id);
  }

  @Get('/place-bookings/:id')
  findAllPlaceBookings(@Param('id') placeId: ObjectId) {
    return this.bookingService.findAllPlaceBookings(placeId);
  }

  @Get('/bookings')
  findAllBookings() {
    return this.bookingService.findAllBookings();
  }

  @Post('/bookings')
  bookPlace(@Body() bookingDto: BookingDto, @Headers('id') userId: ObjectId) {
    return this.bookingService.bookPlace(bookingDto, userId);
  }

  @Delete('/bookings/:id')
  deleteOne(@Param('id') id: string, @Headers('id') userId: ObjectId) {
    if (id === 'all') {
      return this.removeAll(userId);
    }
    return this.bookingService.deleteOne(id);
  }

  @Delete('/bookings/all')
  async removeAll(@Headers('id') userId: ObjectId) {
    await this.bookingService.removeAll(userId);
    return { message: 'All places have been deleted.' };
  }
}
