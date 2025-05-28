import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  admin_redirect_url?: string;

  @IsOptional()
  user_redirect_url?: string;

  @IsInt()
  user_id: number;
}
