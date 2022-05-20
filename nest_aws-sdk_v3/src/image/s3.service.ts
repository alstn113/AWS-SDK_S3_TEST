import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  s3Client: S3Client;
  bucket: string;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('s3.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('s3.accessKey'),
        secretAccessKey: this.configService.get<string>('s3.secretKey'),
      },
    });
    this.bucket = this.configService.get<string>('s3.bucket');
  }

  async getObject(fileName: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });
      const response = await this.s3Client.send(command);
      return response;
    } catch (err) {
      return null;
    }
  }

  async putObject(fileName: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file.buffer,
    });
    const response = await this.s3Client.send(command);
    return response;
  }

  async deleteObject(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });
    const response = await this.s3Client.send(command);
    return response;
  }
}
