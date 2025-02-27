import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartProductService } from './cart_product/cart_product.service';
import { CartProduct } from './cart_product/entities/cart_product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    private readonly cartProductService: CartProductService,
  ) {}
  async create(
    createCartDto: CreateCartDto,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const { cart_product }: CreateCartDto = createCartDto;
    const cart = this.cartRepository.create({
      user: { id: userId },
    });
    const savedCart = await this.cartRepository.save(cart);
    const cartId: number = savedCart.id;
    await this.cartProductService.create({
      product_id: cart_product.product_id,
      variant_id: cart_product.variant_id,
      quantity: cart_product.quantity,
      price: cart_product.price,
      cart_id: cartId,
    });
    return {
      success: true,
      message: 'Tạo giỏ hàng thành công',
    };
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const cart = await this.cartRepository.findOneBy({ id: id });
    if (!cart) {
      throw new NotFoundException('Giỏ hàng không tồn tại');
    }

    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: updateCartDto.cart_product?.product_id },
        variant: { id: updateCartDto.cart_product?.variant_id },
      },
    });
    if (!cartProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong giỏ hàng');
    }

    await this.cartProductService.update(cartProduct.id, {
      quantity: updateCartDto.cart_product?.quantity,
      price: updateCartDto.cart_product?.price,
    });
    return {
      success: true,
      message: 'Cập nhật giỏ hàng thành công',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
