import { Test, TestingModule } from '@nestjs/testing';
import { BrevoEmailController } from './brevo-email.controller';
import { BrevoEmailService } from './brevo-email.service';

describe('BrevoEmailController', () => {
  let controller: BrevoEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrevoEmailController],
      providers: [BrevoEmailService],
    }).compile();

    controller = module.get<BrevoEmailController>(BrevoEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
