import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUserDto(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      _page?: string;
      _limit?: string;
      _sort?: string;
      _order?: string;
      filter_status?: string;
      filter_name?: string;
      q?: string;
    },
  ) {
    const {
      _page = 1,
      _limit = 1,
      _sort = '',
      _order = '',
      filter_status = '',
      filter_name = '',
      q = '',
    } = query;
    let filter = {} as {
      [key: string]: any;
    };
    if (filter_status) {
      filter.status = filter_status === 'true';
    }
    if (filter_name) {
      filter.name = filter_name;
    }
    if (q) {
      filter = [
        {
          name: ILike(`%${q}%`),
        },
        {
          email: ILike(`%${q}%`),
        },
      ];
    }
    return this.userService.findAll(
      Number(_page),
      Number(_limit),
      _sort,
      _order,
      filter,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('roles/:id')
  addRole(@Body() body: CreateRoleDto, @Param('id') id: string) {
    return this.userService.addRole(+id, body);
  }
}
