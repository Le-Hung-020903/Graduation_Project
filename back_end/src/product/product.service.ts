import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { UpdateIngredientDto } from './ingredient/dto/update-ingredient.dto';
import { UpdateVariantDto } from './variant/dto/update-variant.dto';
import { Category } from 'src/category/entities/category.entity';
import { FavoriteProduct } from './favorite_product/entities/favorite_product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(FavoriteProduct)
    private readonly favoriteProductRepository: Repository<FavoriteProduct>,
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
      desc_markdown,
      desc_html,
      manufacturer_id,
      ingredients,
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
      desc_markdown,
      desc_html,
    });
    const saveProduct = await this.productRepository.save(product);

    // Upload ảnh lên Cloudinary trong thư mục `products`
    if (files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const image = await this.cloudinaryService.uploadFile(
            file,
            'products',
          );

          //  Lưu URL ảnh vào bảng `product_images`
          return await this.productImageService.create({
            url: image.secure_url,
            product_id: saveProduct.id,
          });
        }),
      );
    }

    // Thêm biến thể và nguyên liệu của sản phẩm
    await this.ingredientService.create({
      product_id: saveProduct.id,
      ingredients,
    });

    await this.variantService.create({
      variants,
      product_id: saveProduct.id,
    });

    return {
      success: true,
      message: 'Thêm mới sản phẩm thành công',
    };
  }

  async findAll(
    limit: number,
    page: number,
    categorySlug?: string,
    _sort_price?: string,
    userId?: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    breadCrumb: { name: string; slug: string; depth: number }[];
  }> {
    // Kiểm tra và ép kiểu limit về số nếu cần
    limit = Number(limit);
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException('Invalid limit value');
    }

    const skip = (page - 1) * limit;
    const sortPrice = _sort_price?.toLowerCase();

    // Nếu có categorySlug thì lấy id của danh mục đó
    let categoryIds: number[] = [];
    let breadCrumb: { name: string; slug: string; depth: number }[] = [];

    if (categorySlug) {
      const category = await this.categoryRepository.findOne({
        where: { slug: categorySlug },
      });
      if (!category) {
        throw new NotFoundException('Danh mục không tồn tại');
      }

      // Gọi hàm trong PostgreSQL để lấy toàn bộ id con
      const rawIds = await this.categoryRepository.query(
        'SELECT * FROM get_child_category_ids($1)',
        [category.id],
      );

      // Lấy id để tạo thanh điều hướng
      breadCrumb = await this.productRepository.query(
        'SELECT * FROM get_category_path_names($1)',
        [category.id],
      );

      categoryIds = rawIds.map((row) => row.category_id);
    }

    // Xây dựng truy vấn với các join
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.variants', 'variants') // Đảm bảo là leftJoinAndSelect
      .leftJoinAndSelect('variants.unit', 'unit')
      .take(limit) // Ensure that limit is a valid number
      .skip(skip)
      .select([
        'product.id',
        'product.name',
        'product.slug',
        'category.name',
        'images.url',
        'variants.price',
        'unit.symbol',
      ]);

    // Xử lý điều kiện WHERE linh hoạt
    if (categoryIds.length > 0) {
      queryBuilder.where('product.category_id IN (:...categoryIds)', {
        categoryIds,
      });
    }

    if (sortPrice === 'asc' || sortPrice === 'desc') {
      // Sắp xếp theo giá của biến thể (ascending hoặc descending) trong câu truy vấn
      queryBuilder.orderBy(
        'variants.price',
        sortPrice === 'asc' ? 'ASC' : 'DESC',
      );
    }

    const [products, total] = await queryBuilder.getManyAndCount();

    // Lấy sản phẩm yêu thích khi có id người dùng
    const favoriteProduct = userId
      ? await this.favoriteProductRepository
          .createQueryBuilder('fp')
          .leftJoin('fp.product', 'product')
          .where('fp.user_id = :userId', { userId })
          .select('product.id', 'product')
          .getRawMany()
      : [];
    const favoriteProductIds = new Set(
      favoriteProduct.map((item) => item.product),
    );

    const results = products.map((item) => ({
      ...item,
      isFavorite: favoriteProductIds.has(item.id),
    }));

    return {
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      data: results,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      breadCrumb,
    };
  }

  async findOne(
    param: string,
    userId?: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: Product;
    breadCrumb: { name: string; slug: string; depth: number }[];
  }> {
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

    // Lấy id để tạo thanh điều hướng
    const breadCrumb = await this.productRepository.query(
      'SELECT * FROM get_category_path_names($1)',
      [product?.category.id],
    );

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }
    // Lấy sản phẩm yêu thích khi có id người dùng
    const favoriteProduct = userId
      ? await this.favoriteProductRepository
          .createQueryBuilder('fp')
          .leftJoin('fp.product', 'product')
          .where('fp.user_id = :userId', { userId })
          .select('product.id', 'product')
          .getRawMany()
      : [];
    const favoriteProductIds = new Set(
      favoriteProduct.map((item) => item.product),
    );
    const results = {
      ...product,
      isFavorite: favoriteProductIds.has(product.id),
    };

    return {
      success: true,
      message: 'Lấy thông tin sản phẩm thành công',
      data: results,
      breadCrumb,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const existProduct = await this.productRepository.findOne({
      where: { id },
      relations: [
        'images',
        'category',
        'manufacturer',
        'ingredients',
        'variants',
        'variants.unit',
      ],
    });
    if (!existProduct) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    // Cập nhật `updated_at` và slug
    updateProductDto.updated_at = new Date();
    const createSlug = Slug.createSlug(updateProductDto.name);

    // Lưu toàn bộ dữ liệu mới
    await this.productRepository.save({
      id: id,
      name: updateProductDto.name,
      category: { id: updateProductDto.category_id },
      manufacturer: { id: updateProductDto.manufacturer_id },
      desc_markdown: updateProductDto.desc_markdown,
      desc_html: updateProductDto.desc_html,
      slug: createSlug,
    });

    if (files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const image = await this.cloudinaryService.uploadFile(
            file,
            'products',
          );

          //  Lưu URL ảnh vào bảng `product_images`
          return await this.productImageService.create({
            url: image.secure_url,
            product_id: id,
          });
        }),
      );
    }

    // ✅ Nếu có ingredients -> Cập nhật bulk thay vì gọi API từng cái
    if (
      Array.isArray(updateProductDto.ingredients) &&
      updateProductDto.ingredients?.length
    ) {
      const updateIngredientDto: UpdateIngredientDto[] =
        updateProductDto.ingredients
          .filter((ingredient) => ingredient.id) // Chỉ lấy những nguyên liệu có ID hợp lệ
          .map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            info: ingredient.info,
            updated_at: new Date(),
          }));
      if (updateIngredientDto.length) {
        await this.ingredientService.update(updateIngredientDto);
      }
    }

    // // ✅ Nếu có variants -> Cập nhật bulk thay vì gọi API từng cái
    if (
      Array.isArray(updateProductDto.variants) &&
      updateProductDto.variants?.length
    ) {
      const updateVariantsDto: UpdateVariantDto[] = updateProductDto.variants
        .filter((variant) => variant.id) // Chỉ lấy những biến thể có ID hợp lệ
        .map((variant) => ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          stock: variant.stock,
          weight: variant.weight,
          litre: variant.litre,
          sku: variant.sku,
          unit_id: variant.unit_id,
          updated_at: new Date(),
        }));

      if (updateVariantsDto.length) {
        await this.variantService.update(updateVariantsDto);
      }
    }

    return {
      success: true,
      message: 'Cập nhật sản phẩm thành công',
    };
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
