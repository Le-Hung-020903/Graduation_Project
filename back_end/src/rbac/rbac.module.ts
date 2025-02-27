import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  controllers: [RbacController],
  providers: [RbacService],
  imports: [RoleModule, PermissionModule],
})
export class RbacModule {}
