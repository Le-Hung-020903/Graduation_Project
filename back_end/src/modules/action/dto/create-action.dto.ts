import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateActionDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Tên hành động phải có ít nhất 3 và tối đa 20 ký tự!',
  })
  name: string;
}
