import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // 단일 파일 업로드
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file);
  }

  // 복수 파일 업로드 (5개 이하)
  @Post('/uploads')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.imageService.uploadImages(files);
  }

  // 단일 파일 삭제
  @Delete('/:fileName')
  async deleteImage(@Param('fileName') fileName: string) {
    return this.imageService.deleteImage(fileName);
  }
}
