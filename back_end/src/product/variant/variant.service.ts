import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}
  async create(createVariantDto: CreateVariantDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const { variants, product_id }: CreateVariantDto = createVariantDto;

    const variantInstances = variants.map((item) =>
      this.variantRepository.create({
        name: item.name,
        price: item.price,
        stock: item.stock,
        weight: item.weight,
        litre: item.litre,
        sku: item.sku,
        product: { id: product_id },
        unit: { id: item.unit_id },
      }),
    );

    // Lưu tất cả các biến thể vào database
    await Promise.all(
      variantInstances.map(
        async (item) => await this.variantRepository.save(item),
      ),
    );
    return {
      success: true,
      message: 'Tạo nguyên liệu thành công',
    };
  }

  findAll() {
    return `This action returns all variant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
