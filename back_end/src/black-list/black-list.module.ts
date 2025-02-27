import { Module } from '@nestjs/common';
import { BlackListService } from './black-list.service';
import { BlackList } from './entities/black-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList]), UserModule],
  providers: [BlackListService, AuthGuard],
  exports: [BlackListService],
})
export class BlackListModule {}
