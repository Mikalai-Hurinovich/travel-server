import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { FileService, FileType } from '../file/file.service';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './schemas/place.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class PlaceService {
  constructor(
    private fileService: FileService,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    return await this.placeModel.create<CreatePlaceDto>({
      ...createPlaceDto,
    });
  }

  uploadFiles(photos: Array<Express.Multer.File>) {
    return this.fileService.createFiles(FileType.PHOTOS, photos);
  }

  findAllUserPlaces(userId: string) {
    return this.placeModel.find({ owner: userId });
  }

  findAll() {
    return this.placeModel.find();
  }

  findOne(id: string) {
    return this.placeModel.findById(id);
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto, userId: ObjectId) {
    if (userId === updatePlaceDto.owner) {
      return this.placeModel.findByIdAndUpdate(id, updatePlaceDto, {
        new: true,
        useFindAndModify: false,
      });
    } else {
      throw new HttpException(
        "You Can't modify this place!",
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string): Promise<Place> {
    const deletedPlace = await this.placeModel.findByIdAndDelete(id).exec();
    if (!deletedPlace) {
      throw new HttpException(
        `Place with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return deletedPlace;
  }

  async removeAll(userId: ObjectId): Promise<any> {
    return this.placeModel.deleteMany({ owner: userId }).exec();
  }
}
