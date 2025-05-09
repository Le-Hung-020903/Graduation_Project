import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/rbac/role/entities/role.entity';
import { AddressModule } from './address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AddressModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
