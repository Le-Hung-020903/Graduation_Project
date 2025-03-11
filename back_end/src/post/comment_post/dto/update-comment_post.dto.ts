import { PartialType } from '@nestjs/swagger';
import { CreateCommentPostDto } from './create-comment_post.dto';

export class UpdateCommentPostDto extends PartialType(CreateCommentPostDto) {}
