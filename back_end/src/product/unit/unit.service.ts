import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
  ) {}
  async create(
    createUnitDto: CreateUnitDto,
  ): Promise<{ success: boolean; message: string }> {
    const { name, symbol }: CreateUnitDto = createUnitDto;
    const exitsUnit = await this.unitRepository.findOne({
      where: { name: Like(`${name.trim().toLowerCase()}`) },
    });
    if (exitsUnit) {
      throw new BadRequestException('Đơn vị đã tồn tại');
    }
    const unit = this.unitRepository.create({ name: name.trim(), symbol });
    await this.unitRepository.save(unit);
    return {
      success: true,
      message: 'Tạo đơn vị thành công',
    };
  }
  async update(
    id: number,
    updateUnitDto: UpdateUnitDto,
  ): Promise<{ success: boolean; message: string }> {
    const unit = await this.unitRepository.findOne({ where: { id } });
    if (!unit) {
      throw new BadRequestException('Đơn vị không tồn tại');
    }
    updateUnitDto.updated_at = new Date();
    await this.unitRepository.update(id, updateUnitDto);
    return {
      success: true,
      message: 'Cập nhật đơn vị thành công',
    };
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: Unit[];
  }> {
    const unit = await this.unitRepository.find({
      select: {
        id: true,
        symbol: true,
      },
    });
    return {
      success: true,
      message: 'Lấy danh sách đơn vị thành công',
      data: unit,
    };
  }
}
