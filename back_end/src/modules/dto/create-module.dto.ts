import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateActionDto } from '../action/dto/create-action.dto';
import { Type } from 'class-transformer';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Tên module phải có ít nhất 3 và tối đa 20 ký tự!',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50, {
    message: 'Mô tả module phải có ít nhất 3 và tối đa 50 ký tự!',
  })
  desc: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Cần ít nhất một nguyên liệu' })
  @ValidateNested({ each: true })
  @Type(() => CreateActionDto)
  actions: CreateActionDto[];
}
