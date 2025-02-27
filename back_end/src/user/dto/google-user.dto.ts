import {
  IsNotEmpty,
  IsString,
  Matches,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class GoogleUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email không hợp lệ!',
  })
  email: string;

  @IsOptional() // Không bắt buộc vì Google không cung cấp password
  password?: string; // Không yêu cầu mật khẩu khi đăng nhập bằng Google

  @IsOptional() // Google có thể không trả về số điện thoại
  phone?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;
}
