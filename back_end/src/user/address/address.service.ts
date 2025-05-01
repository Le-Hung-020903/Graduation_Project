import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  @InjectRepository(Address)
  private readonly addressRepository: Repository<Address>;

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const normalized = {
      phone: createAddressDto.phone.trim(),
      name: createAddressDto.name.trim().toLowerCase(),
      province: createAddressDto.province.trim().toLowerCase(),
      district: createAddressDto.district.trim().toLowerCase(),
      ward: createAddressDto.ward.trim().toLowerCase(),
      street: createAddressDto.street.trim().toLowerCase(),
    };

    const existing = await this.addressRepository.findOne({
      where: {
        phone: normalized.phone,
        name: normalized.name,
        province: normalized.province,
        district: normalized.district,
        ward: normalized.ward,
        street: normalized.street,
        user: { id: userId },
      },
    });

    if (existing) {
      throw new ConflictException('Địa chỉ đã tồn tại');
    }
    const address = await this.addressRepository.create({
      ...normalized,
      is_default: createAddressDto.is_default ?? false,
      user: { id: userId },
    });
    await this.addressRepository.save(address);
    return {
      success: true,
      message: 'Địa chỉ đã được tạo thành công',
    };
  }

  async findAll(id: number): Promise<{
    success: boolean;
    message: string;
    data: Address[];
  }> {
    const exitsAddress = await this.addressRepository.find({
      where: {
        user: { id },
      },
    });
    if (!exitsAddress) {
      throw new NotFoundException('Không tồn tại dịa chỉ');
    }
    return {
      success: true,
      message: 'Lấy danh sách địa chỉ thành công',
      data: exitsAddress,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const exitsAddress = await this.addressRepository.findOne({
      where: { id },
    });
    if (!exitsAddress) {
      throw new NotFoundException('Không tồn tại địa chỉ');
    }
    updateAddressDto.updated_at = new Date();
    await this.addressRepository.update(id, updateAddressDto);
    return {
      success: true,
      message: 'Địa chỉ đã được cập nhật thành công',
    };
  }

  async remove(id: number): Promise<{
    success: boolean;
    message: string;
  }> {
    const exitsAddress = await this.addressRepository.findOne({
      where: { id },
    });
    if (!exitsAddress) {
      throw new NotFoundException('Không tồn tại địa chỉ');
    }
    await this.addressRepository.remove(exitsAddress);
    return {
      success: true,
      message: 'Địa chỉ đã được xoá thành công',
    };
  }
  async getAllAddress(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Bạn cần phải đăng nhập');
    }
    const address = await this.addressRepository.find({
      where: {
        user: { id: userId },
      },
    });
    return {
      success: true,
      message: 'Lấy danh sách địa chỉ thành công',
      data: address,
    };
  }
}
