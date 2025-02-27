import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import Hash from 'src/utils/hashing';
import JWT from 'src/utils/jwt';
import { BlackListService } from 'src/black-list/black-list.service';
import { UserToken } from './entities/user_token.entity';
import { LogoutData } from './interface/logout.interface';
import { GoogleUserDto } from 'src/user/dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    private readonly blackListService: BlackListService,
  ) {}

  async login(
    createAuthDto: CreateAuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = createAuthDto;
    if (!email || !password) {
      throw new HttpException(
        'Vui lòng nhập email và mật khẩu',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userActive = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!userActive) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu không đúng',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!userActive?.status) {
      throw new HttpException(
        'Vui lòng kích hoạt tài khoản để đăng nhập',
        HttpStatus.FORBIDDEN,
      );
    }

    const matchPassword: boolean = Hash.verify(password, userActive.password);
    if (!matchPassword) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu không đúng',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken: string = JWT.createAccessToken({
      userId: userActive.id,
    });
    const refreshToken: string = JWT.createRefreshToken();

    // Lưu refreshToken vào user token
    const saveRefreshToken = await this.userTokenRepository.create({
      user_id: userActive.id,
      refresh_token: refreshToken,
    });
    await this.userTokenRepository.save(saveRefreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string, data: LogoutData) {
    // Thêm accessToken vào danh sách blacklist
    await this.blackListService.addAccessToken(data.accessToken, data.exp);

    // Tìm refresh token của user
    const removeRefreshToken = await this.userTokenRepository.findOne({
      where: {
        user_id: data.id,
        refresh_token: refreshToken,
      },
    });
    if (!removeRefreshToken) {
      throw new NotFoundException('Refresh token không tồn tại');
    }

    // Xóa refresh token khỏi database
    await this.userTokenRepository.remove(removeRefreshToken);
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    // Verify refreshToken trước khi tìm trong DB
    const decode = JWT.verifyToken(refreshToken);
    if (!decode) {
      throw new UnauthorizedException('Token truy cập trái phép');
    }

    // Kiểm tra sự tồn tại của refreshToken trong DB
    const checkRefreshToken = await this.userTokenRepository.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!checkRefreshToken) {
      throw new NotFoundException('Refresh token không tồn tại');
    }

    //Nếu tồn tại trong db --> lấy ra userId
    const { user_id }: { user_id: number } = checkRefreshToken;

    // khởi tạo accessToken và refresh mới
    const accessToken: string = JWT.createAccessToken({ userId: user_id });
    const newRefreshToken: string = JWT.createRefreshToken();

    if (!accessToken || !newRefreshToken) {
      throw new InternalServerErrorException('Không thể tạo token');
    }

    const saveRefreshToken = await this.userTokenRepository.findOne({
      where: {
        user_id,
        refresh_token: refreshToken,
      },
    });
    if (saveRefreshToken) {
      await this.userTokenRepository.update(
        { user_id: user_id },
        { refresh_token: newRefreshToken },
      );
    }

    return {
      accessToken,
      newRefreshToken,
    };
  }

  async validateGoogleUser(googleUser: GoogleUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: googleUser.email,
      },
    });
    if (!user) {
      const newGoogleUser = this.userRepository.create({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.avatar,
      });
      await this.userRepository.save(newGoogleUser);
    }
    return user;
  }
}
