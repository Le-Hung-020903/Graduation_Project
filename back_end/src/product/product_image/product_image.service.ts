import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductImageDto: CreateProductImageDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const { url, product_id }: CreateProductImageDto = createProductImageDto;
    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });
    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }
    const urlInstance = this.productImageRepository.create({
      url: url,
      product: { id: product_id },
    });
    await this.productImageRepository.save(urlInstance);
    return {
      success: true,
      message: 'Tạo ảnh sản phẩm thành công',
    };
  }

  findAll() {
    return `This action returns all productImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
