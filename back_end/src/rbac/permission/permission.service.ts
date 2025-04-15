import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly roleService: RoleService,
  ) {}
  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<{ success: boolean; message: string }> {
    let { name, permissions }: CreatePermissionDto = createPermissionDto;
    const roleName = name.trim().toLowerCase();
    let role = await this.roleRepository.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });

    if (!role) {
      role = await this.roleService.create({ name: roleName });
    }

    const permissionValue = Array.isArray(permissions)
      ? permissions.map((p) => p.trim().toLowerCase())
      : [permissions];

    // Lấy tất cả các permission đã tồn tại trong một lần truy vấn
    const exitsingPermissions = await this.permissionRepository.find({
      where: { value: In(permissionValue) },
    });

    // Tạo danh sách các permissions chưa tồn tại
    const exitsPermissionValues = new Set(
      exitsingPermissions.map((p) => p.value.toLowerCase()),
    );
    const newPermissions = permissionValue
      .filter((value) => !exitsPermissionValues.has(value))
      .map((value) => this.permissionRepository.create({ value: value }));

    // Chỉ lưu một lần cho tất cả các permission mới
    if (newPermissions.length > 0) {
      await this.permissionRepository.save(newPermissions);
    }

    // Gán lại permissions cho role, đảm bảo không bị trùng lặp
    role.permissions = [
      ...(role.permissions ?? []), // Giữ lại quyền cũ
      ...exitsingPermissions, // Thêm quyền đã có
      ...newPermissions, // Thêm quyền mới
    ];

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

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<{ success: boolean; message: string }> {
    let { name, permissions }: UpdatePermissionDto = updatePermissionDto;

    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Vai trò không tồn tại');
    }

    // Cập nhật tên role nếu có thay đổi
    const roleName = name?.trim().toLowerCase();
    if (roleName && role.name !== roleName) {
      role.name = roleName;
    }

    // Xử lý permission mới từ FE
    const permissionSet = new Set(
      Array.isArray(permissions)
        ? permissions.map((p) => p.trim().toLowerCase())
        : [permissions],
    );

    // Lấy permission hiện tại của role
    const currentPermissionsSet = new Set(
      role.permissions.map((p) => p.value.toLowerCase()),
    );

    // Tìm permission cần THÊM vào role
    const permissionsToAdd = [...permissionSet]
      .filter((p): p is string => !!p)
      .filter((p) => !currentPermissionsSet.has(p));

    // Tìm permission cần XÓA khỏi role (không xóa khỏi DB)
    const permissionsToRemoveFromRole = [...currentPermissionsSet].filter(
      (p) => !permissionSet.has(p),
    );

    // Tìm permission đã tồn tại trong DB
    const existingPermissions = await this.permissionRepository.find({
      where: { value: In(permissionsToAdd) },
    });

    // Tạo permission mới chưa có trong DB
    const newPermissions = permissionsToAdd
      .filter(
        (value) =>
          !existingPermissions.some((p) => p.value.toLowerCase() === value),
      )
      .map((value) => this.permissionRepository.create({ value }));

    // Lưu permission mới vào DB
    if (newPermissions.length > 0) {
      await this.permissionRepository.save(newPermissions);
    }

    // 7.// Cập nhật danh sách permission của role:
    // 1. Giữ lại permission hiện có
    // 2. Thêm permission mới
    // 3. Loại bỏ permission bị bỏ chọn
    role.permissions = Array.from(
      new Map(
        [
          ...existingPermissions,
          ...newPermissions,
          ...role.permissions.filter(
            (p) => !permissionsToRemoveFromRole.includes(p.value.toLowerCase()),
          ),
        ].map((p) => [p.value, p]), // Tạo Map với key là permission.value
      ).values(), // Lấy các giá trị unique từ Map
    );

    // **Cập nhật thời gian `updated_at`**
    role.updated_at = new Date();

    // Lưu role cập nhật vào database
    await this.roleRepository.save(role);
    return {
      success: true,
      message: 'Cập nhật vai trò thành công',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
