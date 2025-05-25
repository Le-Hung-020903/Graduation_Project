import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGenerativeAiController } from './google-generative-ai.controller';
import { GoogleGenerativeAiService } from './google-generative-ai.service';

describe('GoogleGenerativeAiController', () => {
  let controller: GoogleGenerativeAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleGenerativeAiController],
      providers: [GoogleGenerativeAiService],
    }).compile();

    controller = module.get<GoogleGenerativeAiController>(GoogleGenerativeAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
