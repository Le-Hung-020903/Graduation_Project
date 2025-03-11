import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import Slug from 'src/utils/slug';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductImageService } from './product_image/product_image.service';
import { IngredientService } from './ingredient/ingredient.service';
import { VariantService } from './variant/variant.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productImageService: ProductImageService,
    private readonly ingredientService: IngredientService,
    private readonly variantService: VariantService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const {
      name,
      category_id,
      desc,
      manufacturer_id,
      // ingredients,
      variants,
    }: CreateProductDto = createProductDto;
    //  Tạo slug cho sản phẩm
    const createSlug = Slug.createSlug(name);

    //  Tạo sản phẩm
    const product = this.productRepository.create({
      name,
      category: { id: category_id },
      manufacturer: { id: manufacturer_id },
      slug: createSlug,
      desc,
    });
    const saveProduct = await this.productRepository.save(product);

    // Upload ảnh lên Cloudinary trong thư mục `products`
    // if (files.length > 0) {
    //   await Promise.all(
    //     files.map(async (file) => {
    //       const image = await this.cloudinaryService.uploadFile(
    //         file,
    //         'products',
    //       );

    //       //  Lưu URL ảnh vào bảng `product_images`
    //       return await this.productImageService.create({
    //         url: image.secure_url,
    //         product_id: saveProduct.id,
    //       });
    //     }),
    //   );
    // }

    // Thêm biến thể và nguyên liệu của sản phẩm
    // await this.ingredientService.create({
    //   product_id: saveProduct.id,
    //   ingredients,
    // });

    await this.variantService.create({
      variants,
      product_id: saveProduct.id,
    });

    return {
      success: true,
      message: 'Thêm mới sản phẩm thành công',
    };
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(
    param: string,
  ): Promise<{ success: boolean; message: string; data: Product }> {
    let product: Product | null;
    if (!isNaN(+param)) {
      product = await this.productRepository.findOne({
        where: { id: +param },
        relations: [
          'images',
          'category',
          'manufacturer',
          'ingredients',
          'variants',
          'variants.unit',
        ],
      });
    } else {
      product = await this.productRepository.findOne({
        where: { slug: param },
        relations: [
          'images',
          'category',
          'manufacturer',
          'ingredients',
          'variants',
          'variants.unit',
        ],
      });
    }
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }
    return {
      success: true,
      message: 'Lấy thông tin sản phẩm thành công',
      data: product,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }
    await this.productRepository.remove(product);
    return {
      success: true,
      message: 'Xóa sản phẩm thành công',
    };
  }
}
