import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  IsString as IsStringEach,
  Matches,
} from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Tên vai trò phải có ít nhất 3 và tối đa 20 ký tự!',
  })
  name: string;

  @IsArray()
  @IsStringEach({ each: true, message: 'Mỗi quyền phải là một chuỗi' }) // Kiểm tra từng phần tử trong mảng là chuỗi
  @ArrayMinSize(1, { message: 'Phải có ít nhất 1 quyền' })
  @Matches(/^[a-z]+\.[a-z]+$/, {
    each: true,
    message: 'Mỗi quyền phải có định dạng "resource.action"',
  })
  permissions: string[];
}
