import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGenerativeAiService } from './google-generative-ai.service';

describe('GoogleGenerativeAiService', () => {
  let service: GoogleGenerativeAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleGenerativeAiService],
    }).compile();

    service = module.get<GoogleGenerativeAiService>(GoogleGenerativeAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
