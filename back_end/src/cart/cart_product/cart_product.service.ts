import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {}
  async create(createCartProductDto: CreateCartProductDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const {
      product_id,
      variant_id,
      price,
      quantity,
      cart_id,
    }: CreateCartProductDto = createCartProductDto;
    const cart = this.cartProductRepository.create({
      quantity: quantity,
      price: price,
      product: { id: product_id },
      cart: { id: cart_id },
      variant: { id: variant_id },
    });
    await this.cartProductRepository.save(cart);
    return {
      success: true,
      message: 'Thêm phần tử của giỏ hàng thành công',
    };
  }

  findAll() {
    return `This action returns all cartProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProduct`;
  }

  async update(
    id: number,
    updateCartProductDto: UpdateCartProductDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    let { price, quantity }: UpdateCartProductDto = updateCartProductDto;
    updateCartProductDto.updated_at = new Date();
    if (
      updateCartProductDto.price !== undefined &&
      typeof updateCartProductDto.price === 'number'
    ) {
      price = updateCartProductDto.price;
    }
    if (
      updateCartProductDto.quantity !== undefined &&
      typeof updateCartProductDto.price === 'number'
    ) {
      quantity = updateCartProductDto.quantity;
    }
    await this.cartProductRepository.update(id, updateCartProductDto);
    return {
      success: true,
      message: 'Cập nhật phần tử của giỏ hàng thành công',
    };
  }

  async remove(id: number): Promise<{
    success: boolean;
    message: string;
  }> {
    const cart = await this.cartProductRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Không tìm thấy phần tử của giỏ hàng');
    }
    await this.cartProductRepository.remove(cart);
    return {
      success: true,
      message: 'Xóa phần tử giỏ hàng thành công',
    };
  }
}
