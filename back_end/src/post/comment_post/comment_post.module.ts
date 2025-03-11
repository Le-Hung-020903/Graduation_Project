import { Module } from '@nestjs/common';
import { CommentPostService } from './comment_post.service';
import { CommentPostController } from './comment_post.controller';

@Module({
  controllers: [CommentPostController],
  providers: [CommentPostService],
})
export class CommentPostModule {}
