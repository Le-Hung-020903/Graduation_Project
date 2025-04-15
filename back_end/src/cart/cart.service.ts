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
    data: Cart;
  }> {
    const { cart_product }: CreateCartDto = createCartDto;
    // 🔥 Kiểm tra giỏ hàng có tồn tại không
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartProducts'],
    });

    if (!cart) {
      // 🛒 Nếu chưa có giỏ hàng thì tạo mới
      cart = this.cartRepository.create({
        user: { id: userId },
        cartProducts: [],
      });
      cart = await this.cartRepository.save(cart);
    }

    // ➕ Thêm sản phẩm mới vào giỏ hàng
    const newCartProduct = await this.cartProductService.create({
      product_id: cart_product.product_id,
      variant_id: cart_product.variant_id,
      quantity: cart_product.quantity,
      price: cart_product.price,
      cart_id: cart.id,
    });

    cart.cartProducts.push(newCartProduct);
    await this.cartRepository.save(cart);
    return {
      success: true,
      message: 'Tạo giỏ hàng thành công',
      data: cart,
    };
  }

  async findByUser(userId: number): Promise<{ success: boolean; data: any }> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartProducts', 'cartProduct')
      .leftJoinAndSelect('cartProduct.product', 'product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('cartProduct.variant', 'variant')
      .leftJoinAndSelect('product.variants', 'allVariants')
      .select([
        'cart.id', // Chỉ lấy id của cart
        'cartProduct.id',
        'cartProduct.quantity',
        'cartProduct.price',
        'product.id',
        'product.name',
        'images.id',
        'images.url',
        'variant.id',
        'variant.name',
        'allVariants.id',
        'allVariants.name',
      ])
      .where('cart.user_id = :userId', { userId }) // Lọc theo userId
      .getOne();

    if (!cart) {
      throw new NotFoundException('Không tìm thấy giỏ hàng.');
    }

    return {
      success: true,
      data: {
        id: cart.id,
        cartProducts: cart.cartProducts.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          product: {
            id: item.product.id,
            name: item.product.name,
          },
          images: {
            id: item.product.images[0].id,
            url: item.product.images[0].url,
          },
          variantSelected: item.variant,
          variants: item.product.variants.map((v) => ({
            id: v.id,
            name: v.name,
          })),
        })),
      },
    };
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: CartProduct;
  }> {
    const cart = await this.cartRepository.findOne({
      where: { id: Number(id), user: { id: userId } },
      relations: ['cartProducts'],
    });

    if (!cart) {
      throw new NotFoundException('Giỏ hàng không tồn tại');
    }

    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: updateCartDto.cart_product?.product_id },
        variant: { id: updateCartDto.cart_product?.variant_id },
      },
      relations: ['cart', 'product', 'variant'],
    });
    if (!cartProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong giỏ hàng');
    }
    cartProduct.quantity =
      updateCartDto.cart_product?.quantity ?? cartProduct.quantity;
    cartProduct.price = updateCartDto.cart_product?.price ?? cartProduct.price;

    await this.cartProductRepository.save(cartProduct);

    return {
      success: true,
      message: 'Cập nhật giỏ hàng thành công',
      data: cartProduct,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
