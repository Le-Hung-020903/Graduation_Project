import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Hash from 'src/utils/hashing';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from 'src/rbac/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    const exitsEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (exitsEmail) {
      throw new ConflictException('Email đã tồn tại');
    }

    const hashPassword: string = Hash.make(createUserDto.password);

    createUserDto.password = hashPassword;
    // Tạo người dùng mới
    const newUser = this.userRepository.create(createUserDto);

    // Lưu người dùng mới vào cơ sở dữ liệu
    await this.userRepository.save(newUser);

    return {
      success: true,
      message: 'Tạo người dùng thành công',
    };
  }

  async getAllNameUser(): Promise<{
    success: boolean;
    message: string;
    data: { id: number; name: string }[];
  }> {
    const users = await this.userRepository.find({
      select: ['id', 'name'],
    });
    return {
      success: true,
      message: 'Lây danh sách người dùng thành công',
      data: users,
    };
  }

  async findAll(
    page: number,
    limit: number,
    sort: string,
    order: string,
    filter: object,
  ) {
    const skip = (page - 1) * limit;
    const sortField = sort.toLowerCase();
    const orderField = order.toLowerCase();

    const [user, total] = await this.userRepository.findAndCount({
      select: ['id', 'name', 'email', 'status', 'phone', 'created_at'],
      take: limit,
      skip,
      where: filter,
      order: {
        [sortField ? sortField : 'id']: orderField ? orderField : 'desc',
      },
    });

    return {
      success: true,
      message: 'Lấy danh sách người dùng thành công',
      data: user,
      pagination: {
        total, // Tổng số user
        page, // Trang hiện tại
        limit, // Số user trên mỗi trang
        totalPages: Math.ceil(total / limit), // Tổng số trang
      },
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      select: [
        'id',
        'name',
        'email',
        'status',
        'phone',
        'avatar',
        'created_at',
      ],
      where: { id },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return {
      success: true,
      message: 'Lấy người dùng thành công',
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.updated_at = new Date();
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    // Nếu email thay đổi, kiểm tra xem có user nào khác đang dùng email này không
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email đã tồn tại');
      }
    }
    await this.userRepository.update(id, updateUserDto);
    return {
      success: true,
      message: 'Cập nhật người dùng thành công',
    };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
    return {
      success: true,
      message: 'Xoá người dùng thành công',
    };
  }

  async addRole(
    id: number,
    body: CreateRoleDto,
  ): Promise<{ success: boolean; message: string }> {
    let { role_ids } = body;
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    if (!role_ids) {
      role_ids = [];
    }
    role_ids = Array.isArray(role_ids) ? role_ids : [role_ids];

    // Lấy danh sách role từ DB
    const roles = await this.roleRepository.find({
      where: { id: In(role_ids) },
    });

    // Cập nhật roles cho user và lưu lại
    user.roles = [...user.roles, ...roles];
    await this.userRepository.save(user);
    return {
      success: true,
      message: 'Thêm vai trò cho người dùng thành công',
    };
  }

  async getPermissionByUser(
    userId: number,
  ): Promise<{ success: boolean; message: string; data: string[] }> {
    if (!userId)
      throw new UnauthorizedException('Bạn cần đăng nhập để kiểm tra quyền');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :userId', { userId })
      .select(['user.id', 'roles.name', 'permissions.value'])
      .getOne();
    const allPermissions = user?.roles.flatMap((item) =>
      item.permissions.map((p) => p.value),
    );
    const uniquePermissions = [...new Set(allPermissions)];
    return {
      success: true,
      message: 'Lấy danh sách quyền thành công',
      data: uniquePermissions,
    };
  }
}
