import { Injectable, NotFoundException } from '@nestjs/common';
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
    const address = await this.addressRepository.create({
      phone: createAddressDto.phone,
      name: createAddressDto.name,
      province: createAddressDto.province,
      district: createAddressDto.district,
      ward: createAddressDto.ward,
      street: createAddressDto.street,
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
}
