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
  async create(
    createCartProductDto: CreateCartProductDto,
  ): Promise<CartProduct> {
    const { product_id, variant_id, price, quantity, cart_id } =
      createCartProductDto;

    // 1. Tìm cart product hiện có
    let cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: { id: cart_id },
        product: { id: product_id },
        variant: { id: variant_id },
      },
    });

    if (cartProduct) {
      console.log('Before update:', cartProduct);

      // 2. Cộng thêm số lượng và giá
      cartProduct.quantity += quantity;
      cartProduct.price += price;
      cartProduct.updated_at = new Date();

      // 3. Lưu lại vào DB (dùng save để ghi đè)
      await this.cartProductRepository.save(cartProduct);

      console.log('After update:', cartProduct);
      return cartProduct;
    } else {
      // 4. Nếu chưa tồn tại, tạo mới
      const newCartProduct = this.cartProductRepository.create({
        quantity,
        price,
        product: { id: product_id },
        cart: { id: cart_id },
        variant: { id: variant_id },
      });

      await this.cartProductRepository.save(newCartProduct);
      return newCartProduct;
    }
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
  ): Promise<{ success: boolean; message: string }> {
    // 1. Lấy sản phẩm hiện có từ DB
    const cartProduct = await this.cartProductRepository.findOne({
      where: { id },
    });

    if (!cartProduct) {
      return {
        success: false,
        message: 'Sản phẩm trong giỏ hàng không tồn tại',
      };
    }

    // 2. Cộng dồn số lượng và giá từ FE
    const updatedQuantity =
      cartProduct.quantity + (updateCartProductDto.quantity ?? 0);
    const updatedPrice = cartProduct.price + (updateCartProductDto.price ?? 0);

    // 3. Cập nhật giá trị mới
    await this.cartProductRepository.update(id, {
      quantity: updatedQuantity,
      price: updatedPrice,
      updated_at: new Date(),
    });

    return {
      success: true,
      message: 'Cập nhật giỏ hàng thành công',
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
