import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { BookingService } from './booking.service';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/bookings/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Get('/user-bookings/:id')
  findAllUserBookings(@Param('id') id: string) {
    return this.bookingService.findAllUserBookings(id);
  }

  @Get('/place-bookings/:id')
  findAllPlaceBookings(@Param('id') placeId: ObjectId) {
    return this.bookingService.findAllPlaceBookings(placeId);
  }

  @UseGuards(AuthGuard())
  @Get('/bookings/:id')
  findAllBookings() {
    return this.bookingService.findAllBookings();
  }

  @Post('/bookings')
  bookPlace(@Body() bookingDto: BookingDto) {
    return this.bookingService.bookPlace(bookingDto);
  }

  @Delete('/bookings/:id')
  async deleteOne(@Param('id') id: string, @Headers('id') userId: ObjectId) {
    if (id === 'all') {
      return this.removeAll(userId);
    }
    await this.bookingService.deleteOne(id);
    return { message: 'Booking has been deleted.' };
  }

  @Delete('/bookings/all')
  async removeAll(userId: ObjectId) {
    await this.bookingService.removeAll(userId);
    return { message: 'All bookings have been deleted.' };
  }
}
