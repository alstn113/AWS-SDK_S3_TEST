import { Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';

@Injectable()
export class ImageService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    return this.s3Service.putObject(fileName, file);
  }

  async uploadImages(files: Array<Express.Multer.File>) {
    files?.forEach((file) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      this.s3Service.putObject(fileName, file);
    });
  }

  async deleteImage(fileName: string) {
    return this.s3Service.deleteObject(fileName);
  }
}
