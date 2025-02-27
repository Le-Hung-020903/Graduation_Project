import { IsNotEmpty, IsString } from 'class-validator';

export class IngredientItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  info: string;
}
