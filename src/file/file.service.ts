import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  PHOTOS = 'photos',
}

@Injectable()
export class FileService {
  createFiles(type: FileType, photos: Array<Express.Multer.File>) {
    const localFiles = [];
    try {
      for (const file of photos) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuid.v4() + '.' + fileExtension;
        const filePath = path.resolve(__dirname, '..', 'static', type);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
        localFiles.push({
          id: uuid.v4(),
          path: `${type}/${fileName}`,
        });
      }
      return localFiles;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
