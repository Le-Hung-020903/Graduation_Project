import { Module } from '@nestjs/common';
import { BrevoEmailService } from './brevo-email.service';
import { BrevoEmailController } from './brevo-email.controller';

@Module({
  controllers: [BrevoEmailController],
  providers: [BrevoEmailService],
  exports: [BrevoEmailService],
})
export class BrevoEmailModule {}
