import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Permissions } from 'src/Decorator/roles.decorator';
import { Public } from 'src/Decorator/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public() // Cách bỏ qua AuthGuard
  // @Permissions('category.create')
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: { _page: string; _limit: string }) {
    const { _page = 1, _limit = 5 } = query;
    return this.categoryService.findAll(Number(_page), Number(_limit));
  }

  @Public()
  @Get('/getAll')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Public()
  @Get('/get_parent_category')
  getParentCategory() {
    return this.categoryService.getParentCategory();
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.categoryService.findOne(param);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Public()
  @Delete(':id')
  // @Permissions('category.delete')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
