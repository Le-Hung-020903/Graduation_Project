import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 50, {
    message: 'Danh mục phải có ít nhất 4 và tối đa 20 ký tự!',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(4, 50, {
    message: 'Danh mục phải có ít nhất 4 và tối đa 50 ký tự!',
  })
  desc?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Parent ID phải là một số nguyên!' })
  parent_id?: number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug chỉ được chứa chữ cái thường, số và dấu gạch ngang!',
  })
  slug?: string;
}
