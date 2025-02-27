import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}
  async create(createIngredientDto: CreateIngredientDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const { ingredients, product_id }: CreateIngredientDto =
      createIngredientDto;
    const ingredientInstances = ingredients.map((item) =>
      this.ingredientRepository.create({
        name: item.name,
        info: item.info,
        product: { id: product_id },
      }),
    );
    await Promise.all(
      ingredientInstances.map(
        async (item) => await this.ingredientRepository.save(item),
      ),
    );
    return {
      success: true,
      message: 'Tạo nguyên liệu thành công',
    };
  }

  findAll() {
    return `This action returns all ingredient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
