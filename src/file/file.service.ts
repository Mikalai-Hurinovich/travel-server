export const B2 = require('backblaze-b2');
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

export enum FileType {
  PHOTOS = 'photos',
}

@Injectable()
export class FileService {
  async createFiles(type: FileType, photos: Array<Express.Multer.File>) {
    const b2 = new B2({
      applicationKeyId: process.env.APP_KEY_ID,
      applicationKey: process.env.APP_KEY,
    });

    try {
      const bucketId = process.env.BUCKET_ID;
      const bucketName = process.env.BUCKET_NAME;

      const remoteFiles = [];
      for (const file of photos) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuid.v4() + '.' + fileExtension;
        const filePath = `${type}/${fileName}`;
        const fileData = file.buffer;

        await b2.authorize();

        const uploadUrl = await b2.getUploadUrl({
          bucketId,
        });
        const response = await b2.uploadFile({
          uploadUrl: uploadUrl.data.uploadUrl,
          uploadAuthToken: uploadUrl.data.authorizationToken,
          bucketId,
          fileName: filePath,
          data: fileData,
        });

        remoteFiles.push({
          id: response.data.fileId,
          path: `https://f005.backblazeb2.com/file/${bucketName}/${filePath}`,
        });
      }

      return remoteFiles;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
