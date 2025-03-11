import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentPostService } from './comment_post.service';
import { CreateCommentPostDto } from './dto/create-comment_post.dto';
import { UpdateCommentPostDto } from './dto/update-comment_post.dto';

@Controller('comment-post')
export class CommentPostController {
  constructor(private readonly commentPostService: CommentPostService) {}

  @Post()
  create(@Body() createCommentPostDto: CreateCommentPostDto) {
    return this.commentPostService.create(createCommentPostDto);
  }

  @Get()
  findAll() {
    return this.commentPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentPostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentPostDto: UpdateCommentPostDto) {
    return this.commentPostService.update(+id, updateCommentPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentPostService.remove(+id);
  }
}
