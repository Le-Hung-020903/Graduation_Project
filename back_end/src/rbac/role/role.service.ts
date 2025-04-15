import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name }: CreateRoleDto = createRoleDto;
    const exitsRole = await this.roleRepository.findOne({
      where: { name },
    });
    if (exitsRole) {
      throw new BadRequestException('Vai trò đã tồn tại');
    }
    const role = this.roleRepository.create({
      name,
    });

    return await this.roleRepository.save(role);
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: Role[];
  }> {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name', 'role.created_at'])
      .getMany();
    return {
      success: true,
      message: 'Lấy vai trò thành công',
      data: roles,
    };
  }

  async findOne(
    param: string,
  ): Promise<{ success: boolean; message: string; data: Role }> {
    const query = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .select(['role.id', 'role.name', 'role.created_at', 'permission.value']);

    // Kiểm tra ID hay tên
    const isId = !isNaN(+param);
    if (isId) {
      query.where('role.id = :id', { id: +param });
    } else {
      query.where('role.name ILIKE :name', { name: `${param.trim()}%` });
    }

    const role = await query.getOne();

    if (!role) {
      throw new NotFoundException('Vai trò không tồn tại');
    }
    return {
      success: true,
      message: 'Lấy vai trò thành công',
      data: role,
    };
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Vai trò không tồn tại');
    }
    updateRoleDto.updated_at = new Date();
    await this.roleRepository.update(id, updateRoleDto);
    return {
      success: true,
      message: 'Cập nhật vai trò thành công',
    };
  }

  async remove(id: number): Promise<{
    success: boolean;
    message: string;
  }> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException('Vai trò không tồn tại');
    }
    await this.roleRepository.remove(role);
    return {
      success: true,
      message: 'Xóa vai trò thành công',
    };
  }
}
