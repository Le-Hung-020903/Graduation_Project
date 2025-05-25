import { Test, TestingModule } from '@nestjs/testing';
import { BrevoEmailService } from './brevo-email.service';

describe('BrevoEmailService', () => {
  let service: BrevoEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrevoEmailService],
    }).compile();

    service = module.get<BrevoEmailService>(BrevoEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
