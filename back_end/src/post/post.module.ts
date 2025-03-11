import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CommentPostModule } from './comment_post/comment_post.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CommentPostModule],
})
export class PostModule {}
