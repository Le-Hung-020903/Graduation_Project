import { Test, TestingModule } from '@nestjs/testing';
import { CommentPostController } from './comment_post.controller';
import { CommentPostService } from './comment_post.service';

describe('CommentPostController', () => {
  let controller: CommentPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentPostController],
      providers: [CommentPostService],
    }).compile();

    controller = module.get<CommentPostController>(CommentPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
