import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IngredientItemDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  info: string;
}
