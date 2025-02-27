import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<{ success: boolean; message: string }> {
    let { name, permissions }: CreatePermissionDto = createPermissionDto;
    const role = await this.roleRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Vai trò không tìm thấy');
    }

    permissions = Array.isArray(permissions) ? permissions : [permissions];

    //  Xử lý từng permission
    const permissionEntities = await Promise.all(
      permissions.map(async (item) => {
        let permission = await this.permissionRepository.findOne({
          where: { value: item.trim() },
        });

        if (!permission) {
          //  Nếu chưa có, tạo mới rồi lưu vào database
          permission = this.permissionRepository.create({ value: item.trim() });
          permission = await this.permissionRepository.save(permission);
        }
        return permission;
      }),
    );

    // Gán lại permissions cho role (giải những cái cũ và thêm những cái vừa tạo)
    role.permissions = [...role.permissions, ...permissionEntities];

    await this.roleRepository.save(role);

    return {
      success: true,
      message: 'Tạo quyền thành công',
    };
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
