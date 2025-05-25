import { Controller } from '@nestjs/common';
import { BrevoEmailService } from './brevo-email.service';

@Controller('brevo-email')
export class BrevoEmailController {
  constructor(private readonly brevoEmailService: BrevoEmailService) {}
}
