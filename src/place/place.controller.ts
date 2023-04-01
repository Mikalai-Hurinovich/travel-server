import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

@Controller('/places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  upload(@UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.placeService.uploadFiles(photos);
  }

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Get('/user-places')
  findAllUserPlaces(@Headers('id') userId: string) {
    return this.placeService.findAllUserPlaces(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Headers('id') userId: ObjectId,
  ) {
    return this.placeService.update(id, updatePlaceDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('id') userId: ObjectId) {
    if (id === 'all') {
      return this.removeAll(userId);
    }
    return this.placeService.remove(id);
  }

  @Delete('/all')
  async removeAll(@Headers('id') id: ObjectId) {
    await this.placeService.removeAll(id);
    return { message: 'All places have been deleted.' };
  }
}
