import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}
  async create(
    createDiscountDto: CreateDiscountDto,
  ): Promise<{ success: boolean; message: string; data: Discount }> {
    const { content, percent, start_date, end_date, code_discount } =
      createDiscountDto;
    if (!content || !percent || !start_date || !end_date || !code_discount) {
      throw new BadRequestException('Vui lòng điền đầy đủ các trường!');
    }
    // find() luôn trả về một mảng, ngay cả khi không tìm thấy gì → if (exitsDiscount) luôn đúng.
    // findOne() chỉ trả về một đối tượng hoặc null → điều kiện kiểm tra hợp lệ hơn.
    const exitsDiscount = await this.discountRepository.findOne({
      where: { code_discount },
    });
    if (exitsDiscount) {
      throw new BadRequestException('Mã giảm giá đã tồn tại!');
    }
    const discount = this.discountRepository.create({
      content: content.trim(),
      code_discount: code_discount.trim(),
      percent,
      start_date,
      end_date,
    });
    await this.discountRepository.save(discount);
    return {
      success: true,
      message: 'Tạo khuyến mãi thành công',
      data: discount,
    };
  }

  async findAll(
    page: number,
    limit: number,
    sort: string,
    order: string,
    filter: object,
  ) {
    const skip = (page - 1) * limit;
    const sortField = sort.toLowerCase();
    const orderField = order.toLowerCase();

    const [discount, total] = await this.discountRepository.findAndCount({
      take: limit,
      skip,
      where: filter,
      order: {
        [sortField ? sortField : 'id']: orderField ? orderField : 'desc',
      },
    });
    return {
      success: true,
      message: 'Lấy danh sách mã giảm giá thành công',
      data: discount,
      pagination: {
        total, // Tổng số user
        page, // Trang hiện tại
        limit, // Số user trên mỗi trang
        totalPages: Math.ceil(total / limit), // Tổng số trang
      },
    };
  }

  async findOne(
    id: number,
  ): Promise<{ success: boolean; message: string; data: Discount }> {
    const discount = await this.discountRepository.findOne({ where: { id } });
    if (!discount) {
      throw new NotFoundException('Không tìm thấy khuyến mãi');
    }
    return {
      success: true,
      message: 'Lấy khuyến mãi thành công',
      data: discount,
    };
  }

  async update(
    id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<{ success: boolean; message: string }> {
    const discount = await this.discountRepository.findOne({ where: { id } });
    if (!discount) {
      throw new NotFoundException('Không tìm thấy khuyến mãi');
    }
    updateDiscountDto.updated_at = new Date();
    await this.discountRepository.update(id, updateDiscountDto);
    return {
      success: true,
      message: 'Cập nhật khuyến mãi thành công',
    };
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const discount = await this.discountRepository.findOne({ where: { id } });
    if (!discount) {
      throw new NotFoundException('Không tìm thấy khuyến mãi');
    }
    await this.discountRepository.remove(discount);
    return {
      success: true,
      message: 'Xoá khuyến mãi thành công',
    };
  }
  async findDiscountList(): Promise<{
    success: boolean;
    message: string;
    data: Discount[];
  }> {
    const discountList = await this.discountRepository.find({
      select: ['id', 'end_date', 'content', 'percent'],
    });
    return {
      success: true,
      message: 'Lấy danh sách khuyến mãi thành công',
      data: discountList,
    };
  }
}
