import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Action } from './action/entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Action])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
