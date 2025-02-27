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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ILike } from 'typeorm';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('create')
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      _page?: string;
      _limit?: string;
      _sort?: string;
      _order?: string;
      filter_name?: string;
    },
  ) {
    const {
      _page = 1,
      _limit = 5,
      _sort = '',
      _order = '',
      filter_name = '',
    } = query;
    let filter = {} as {
      [key: string]: any;
    };
    if (filter_name) {
      filter.content = ILike(`%${filter_name}%`);
    }
    return this.discountService.findAll(
      Number(_page),
      Number(_limit),
      _sort,
      _order,
      filter,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
