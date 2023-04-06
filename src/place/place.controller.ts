import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('/places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  upload(@UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.placeService.uploadFiles(photos);
  }

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user-places/:id')
  findAllUserPlaces(@Param('id') userId: string) {
    return this.placeService.findAllUserPlaces(userId);
  }

  @Get('search')
  search(@Query() query: { search: string; limit: number }) {
    return this.placeService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('id') userId: ObjectId) {
    if (id === 'all') {
      return this.removeAll(userId);
    }
    return this.placeService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/all')
  async removeAll(@Headers('id') id: ObjectId) {
    await this.placeService.removeAll(id);
    return { message: 'All places have been deleted.' };
  }
}
