import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, {
    message: 'Cần ít nhất 1 vai trò',
  })
  role_ids?: number[];
}
