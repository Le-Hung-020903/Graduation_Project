import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteProductDto } from './dto/create-favorite_product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite_product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class FavoriteProductService {
  @InjectRepository(FavoriteProduct)
  private readonly favoriteProductRepository: Repository<FavoriteProduct>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;
  async create(
    createFavoriteProductDto: CreateFavoriteProductDto,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const product = await this.productRepository.findOne({
      where: { id: createFavoriteProductDto.product_id },
    });

    if (!user || !product) {
      throw new NotFoundException('Người dùng hoặc sản phẩm không tồn tại');
    }
    const exitsFavoriteProduct = await this.favoriteProductRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: createFavoriteProductDto.product_id },
      },
    });
    if (exitsFavoriteProduct) {
      throw new BadRequestException('Sản phẩm đã có trong danh sách yêu thích');
    }

    const favoriteProduct = await this.favoriteProductRepository.create({
      product: product,
      user: user,
    });
    await this.favoriteProductRepository.save(favoriteProduct);
    return {
      success: true,
      message: 'Thêm sản phẩm yêu thích thành công',
    };
  }

  async findAll(userId: number): Promise<{
    success: boolean;
    message: string;
    data: any[]; // có thể tạo DTO nếu muốn rõ kiểu hơn
  }> {
    // Lấy danh sách ID các sản phẩm yêu thích của user
    const favorites = await this.favoriteProductRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    const productIds = favorites.map((fav) => fav.product.id);

    if (productIds.length === 0) {
      return {
        success: true,
        message: 'Không có sản phẩm yêu thích nào',
        data: [],
      };
    }

    // Lấy chi tiết sản phẩm theo productIds
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.unit', 'unit')
      .where('product.id IN (:...ids)', { ids: productIds })
      .select([
        'product.id',
        'product.name',
        'product.slug',
        'category.name',
        'images.url',
        'variants.price',
        'unit.symbol',
      ])
      .getMany();

    return {
      success: true,
      message: 'Lấy danh sách sản phẩm yêu thích thành công',
      data: products,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteProduct`;
  }

  update(id: number, updateFavoriteProductDto: UpdateFavoriteProductDto) {
    return `This action updates a #${id} favoriteProduct`;
  }

  async remove(
    id: number,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const favoriteProduct = await this.favoriteProductRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: id },
      },
    });
    if (!favoriteProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm yêu thích');
    }
    await this.favoriteProductRepository.remove(favoriteProduct);
    return {
      success: true,
      message: 'Xoá thành công sản phẩm yêu thích',
    };
  }
}
