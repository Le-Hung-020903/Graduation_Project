import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteProductDto } from './create-favorite_product.dto';

export class UpdateFavoriteProductDto extends PartialType(CreateFavoriteProductDto) {}
