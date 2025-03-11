import { Injectable } from '@nestjs/common';
import { CreateCommentPostDto } from './dto/create-comment_post.dto';
import { UpdateCommentPostDto } from './dto/update-comment_post.dto';

@Injectable()
export class CommentPostService {
  create(createCommentPostDto: CreateCommentPostDto) {
    return 'This action adds a new commentPost';
  }

  findAll() {
    return `This action returns all commentPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentPost`;
  }

  update(id: number, updateCommentPostDto: UpdateCommentPostDto) {
    return `This action updates a #${id} commentPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentPost`;
  }
}
