import { PartialType } from '@nestjs/swagger';
import { CreateVariantItemDto } from './varient-item.dto';
import { IsOptional } from 'class-validator';

export class UpdateVariantDto extends PartialType(CreateVariantItemDto) {
  @IsOptional()
  updated_at?: Date;
}
