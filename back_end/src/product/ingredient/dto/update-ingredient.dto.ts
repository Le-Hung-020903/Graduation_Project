import { PartialType } from '@nestjs/swagger';
import { IngredientItemDto } from './ingredient.item.dto';
import { IsOptional } from 'class-validator';

export class UpdateIngredientDto extends PartialType(IngredientItemDto) {
  @IsOptional()
  updated_at?: Date;
}
