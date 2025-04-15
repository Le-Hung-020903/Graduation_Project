import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import Slug from 'src/utils/slug';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const { name, desc, parent_id }: CreateCategoryDto = createCategoryDto;
    if (!name) {
      throw new BadRequestException('Name bắt buộc phải có');
    }

    const convertSlug: string = Slug.createSlug(name) ?? '';
    // Tìm danh mục cha nếu có
    const parentCategory = parent_id
      ? await this.categoryRepository.findOne({ where: { id: parent_id } })
      : null;
    const createCategory = this.categoryRepository.create({
      name: name.trim(),
      desc,
      parent: parentCategory,
      slug: convertSlug,
    });
    await this.categoryRepository.save(createCategory);
    return {
      success: true,
      message: 'Thêm mới danh mục thành công',
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: Category[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const skip = (page - 1) * limit;
    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: ['parent'],
      take: limit,
      skip,
    });
    return {
      success: true,
      message: 'Lấy tất cả danh mục thành công',
      data: categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(
    param: string,
  ): Promise<{ success: boolean; message: string; data: Category }> {
    let category: Category | null;
    if (!isNaN(+param)) {
      // +param là chuyển "123" --> 123
      // isNaN là kiểm tra nếu là số thì thành false
      // Nên !isNaN là thành true
      category = await this.categoryRepository.findOne({
        where: { id: +param },
      });
    } else {
      category = await this.categoryRepository.findOne({
        where: { slug: param },
      });
    }

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return {
      success: true,
      message: 'Lấy danh mục thành công',
      data: category,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const createSlug: string = Slug.createSlug(updateCategoryDto.name) ?? '';
    updateCategoryDto.slug = createSlug;
    updateCategoryDto.updated_at = new Date();

    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    await this.categoryRepository.update(id, updateCategoryDto);
    return {
      success: true,
      message: 'Cập nhật danh mục thành công',
    };
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    await this.categoryRepository.remove(category);
    return {
      success: true,
      message: 'Xoá danh mục thành công',
    };
  }
  async getAllCategories() {
    const categories = await this.categoryRepository.find({
      where: {
        parent: IsNull(),
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      relations: ['children'],
    });
    return {
      success: true,
      message: 'Lấy tất cả danh mục thành công',
      data: categories,
    };
  }

  async getParentCategory() {
    const categories = await this.categoryRepository.find({
      where: {
        parent: IsNull(),
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return {
      success: true,
      message: 'Lấy danh mục cha thành công',
      data: categories,
    };
  }
}
