import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/Decorator/auth.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  create(@Body() createCartDto: CreateCartDto, @Req() req) {
    const userId: number = req.user?.id;
    return this.cartService.create(createCartDto, userId);
  }

  @Get()
  findByUser(@Req() req) {
    const userId: number = req.user?.id;
    return this.cartService.findByUser(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    if (Object.keys(updateCartDto).length === 0) {
      throw new BadRequestException('Không có dữ liệu để cập nhật');
    }
    return this.cartService.update(+id, updateCartDto, userId);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
