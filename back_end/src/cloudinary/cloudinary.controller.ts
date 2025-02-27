import {
  BadRequestException,
  Controller,
  Post,
  // UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
const LIMIT_COMMON_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOW_COMMON_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
      fileFilter: (req, files, cb) => {
        if (!ALLOW_COMMON_FILE_TYPES.includes(files.mimetype)) {
          return cb(new BadRequestException('Loại file không hợp lệ!'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadImage(@UploadedFiles() files: Express.Multer.File[], folder: string) {
    // return this.cloudinaryService.uploadFile(file, folder);
    return Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file, folder)),
    );
  }
}
