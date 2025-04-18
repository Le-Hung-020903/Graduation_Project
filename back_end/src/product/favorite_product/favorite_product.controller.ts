import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite_product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite_product.dto';

@Controller('favorite-product')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post('create')
  create(
    @Body() createFavoriteProductDto: CreateFavoriteProductDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    return this.favoriteProductService.create(createFavoriteProductDto, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId: number = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Bạn cần đăng nhập để xem sản phẩm yêu thích',
      );
    }
    return this.favoriteProductService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteProductDto: UpdateFavoriteProductDto,
  ) {
    return this.favoriteProductService.update(+id, updateFavoriteProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId: number = req.user?.id;
    return this.favoriteProductService.remove(+id, userId);
  }
}
