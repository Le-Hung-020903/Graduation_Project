import { PartialType } from '@nestjs/swagger';
import { CreateBrevoEmailDto } from './create-brevo-email.dto';

export class UpdateBrevoEmailDto extends PartialType(CreateBrevoEmailDto) {}
