import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}
  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<{ success: boolean; message: string; data: Manufacturer }> {
    const { name, email, address, phone }: CreateManufacturerDto =
      createManufacturerDto;
    const exitsManufacturer = await this.manufacturerRepository.findOne({
      where: { email: email },
    });
    if (exitsManufacturer) {
      throw new BadRequestException('Nhà sản xuất đã tồn tại');
    }
    const manufacturer = this.manufacturerRepository.create({
      name: name.trim(),
      email,
      address,
      phone,
    });
    const newManufacturer =
      await this.manufacturerRepository.save(manufacturer);
    return {
      success: true,
      message: 'Tạo nhà sản xuất thành công',
      data: newManufacturer,
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
    const [manufacturers, total] =
      await this.manufacturerRepository.findAndCount({
        take: limit,
        skip,
        where: filter,
        order: {
          [sortField ? sortField : 'id']: orderField ? orderField : 'desc',
        },
      });
    return {
      success: true,
      message: 'Lấy danh sách nhà sản xuất thành công',
      data: manufacturers,
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
  ): Promise<{ success: boolean; message: string; data: Manufacturer }> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException('Không tìm thấy nhà sản xuất');
    }
    return {
      success: true,
      message: 'Lấy nhà sản xuất thành công',
      data: manufacturer,
    };
  }

  async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException('Không tìm thấy nhà sản xuất');
    }
    updateManufacturerDto.updated_at = new Date();
    await this.manufacturerRepository.update(id, updateManufacturerDto);
    return {
      success: true,
      message: 'Cập nhật nhà sản xuất thành công',
    };
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException('Không tìm thấy nhà sản xuất');
    }
    await this.manufacturerRepository.remove(manufacturer);
    return {
      success: true,
      message: 'Xoá nhà sản xuất thành công',
    };
  }
  async getAllManufactures() {
    const manufacturers = await this.manufacturerRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
    return {
      success: true,
      message: 'Lấy danh sách nhà sản xuất thành công',
      data: manufacturers,
    };
  }
}
