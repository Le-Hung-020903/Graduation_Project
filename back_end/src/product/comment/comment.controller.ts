import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/Decorator/auth.decorator';
const LIMIT_COMMON_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOW_COMMON_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
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
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const userId: number = req.user?.id;
    return this.commentService.create(createCommentDto, userId, files);
  }

  @Public()
  @Get(':id')
  findAll(
    @Param('id') id: string,
    @Query() query: { _page?: string; _limit?: string },
  ) {
    const { _page = '1', _limit = '3' } = query;
    const page = parseInt(_page);
    const limit = parseInt(_limit);
    return this.commentService.findAll(page, limit, +id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
