import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/Decorator/auth.decorator';
import { Permissions } from 'src/Decorator/roles.decorator';
const LIMIT_COMMON_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOW_COMMON_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Permissions('products.insert')
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
      fileFilter: (req, files, cb) => {
        if (!ALLOW_COMMON_FILE_TYPES.includes(files.mimetype)) {
          return cb(new BadRequestException('Loại file không hợp lệ!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.create(createProductDto, files);
  }

  @Public()
  @Get('/search/detail')
  searchProductDetail(@Query('q') query: string, @Req() req) {
    const userId: number = req.user?.id;
    return this.productService.searchProductDetail(query, userId);
  }

  @Public()
  @Get('related/:id')
  getRelatedProduct(@Req() req, @Param('id') id: string) {
    const userId = req?.user?.userId;
    return this.productService.getRelatedProduct(+id, Number(userId));
  }

  @Public()
  @Get('/search')
  searchProduct(@Query('q') query: string) {
    return this.productService.searchProduct(query);
  }

  @Public()
  @Get('get_variant')
  getVariantByProduct() {
    return this.productService.getVariantByProduct();
  }

  @Public()
  @Get()
  findAllWithoutCategory(
    @Req() req,
    @Query()
    query: {
      _page?: string;
      _limit?: string;
      q?: string;
      _sort_price?: string;
    },
  ) {
    const userId = req?.user?.userId;
    const { _page = 1, _limit = 6, _sort_price = '', q = '' } = query;
    return this.productService.findAll(
      Number(_limit),
      Number(_page),
      q,
      _sort_price,
      Number(userId),
    );
  }

  @Public()
  @Get(':param')
  findOne(@Param('param') param: string, @Req() req) {
    const userId = req?.user?.userId;
    return this.productService.findOne(param, Number(userId));
  }

  @Permissions('products.update')
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
      fileFilter: (req, files, cb) => {
        if (!ALLOW_COMMON_FILE_TYPES.includes(files.mimetype)) {
          return cb(new BadRequestException('Loại file không hợp lệ!'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.update(+id, updateProductDto, files);
  }

  @Permissions('products.delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
