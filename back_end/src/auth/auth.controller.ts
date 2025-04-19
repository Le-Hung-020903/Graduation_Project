import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogoutData } from './interface/logout.interface';
import { GoogleAuthGuard } from 'src/guards/google-auth/google-auth.guard';
import { Public } from 'src/Decorator/auth.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res,
  ) {
    const { accessToken, refreshToken, userActive } =
      await this.authService.login(createAuthDto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngay
    });

    return {
      success: true,
      message: 'Đăng nhập thành công',
      data: userActive,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    const refreshToken: string = req.cookies.refreshToken;
    const data: LogoutData = req.user;
    await this.authService.logout(refreshToken, data);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() { user }) {
    return {
      success: true,
      data: user,
    };
  }

  @Post('refresh_token')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const refreshToken: string = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new NotFoundException('Refresh token không tồn tại');
    }
    const { accessToken, newRefreshToken } =
      await this.authService.refresh(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngay
    });
    return {
      success: true,
      message: 'Làm mới token thành công',
    };
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res({ passthrough: true }) res) {
    const user = req.user;
    const { accessToken, refreshToken } =
      await this.authService.signInGoogleUser(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngay
    });
    res.redirect(`${process.env.ENVIRONMENT_LOCAL}`);
    // sau khi có user hãy viết 1 hàm riêng cho việc login bằng google
    // và xử lý gì thì hãy return ở đây (gửi JWT về cookies trình duyệt)
    // và nhớ cho status bằng true khi login với google
    // Gửi email chúc mừng tài khoản đã đăng ký
    // Còn nếu email thì dùng verify tài khoản với JWT
  }

  @Patch('change-password')
  changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    const user = req?.user?.id;
    return this.authService.changePassword(body, +user);
  }
}
