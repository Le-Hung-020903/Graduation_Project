import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Modules } from './entities/module.entity';
import { Action } from './action/entities/action.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}
  async create(createModuleDto: CreateModuleDto): Promise<{
    success: boolean;
    message: string;
  }> {
    const { desc, name, actions } = createModuleDto;
    // **1️⃣ Truy vấn các actions đã tồn tại trong DB**
    const actionNames = Array.isArray(actions)
      ? actions.map((action) => action.name.trim().toLowerCase())
      : [];
    const exitsActions = await this.actionRepository.find({
      where: { name: In(actionNames) },
    });

    // **2️⃣ Lọc ra những actions chưa có trong DB**
    const exitsingActionNames = new Set(
      exitsActions.map((action) => action.name.trim().toLowerCase()),
    );

    const newActions = actions
      .filter(
        (action) => !exitsingActionNames.has(action.name.trim().toLowerCase()),
      )
      .map((action) =>
        this.actionRepository.create({
          name: action.name.trim().toLowerCase(),
        }),
      );

    // **3️⃣ Nếu có actions mới, lưu vào DB**
    if (newActions.length > 0) {
      await this.actionRepository.save(newActions);
    }

    // **4️⃣ Kết hợp actions đã có và mới tạo**
    const allActions = [...exitsActions, ...newActions];

    // **5️⃣ Tạo module và liên kết với actions**
    const module = await this.moduleRepository.create({
      desc: desc.trim(),
      name: name.trim(),
      actions: allActions,
    });

    // **6️⃣ Lưu module + liên kết với actions chỉ trong 1 lần truy vấn**
    await this.moduleRepository.save(module);

    return {
      success: true,
      message: 'Tạo module thành công',
    };
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: Modules[];
  }> {
    const modules = await this.moduleRepository
      .createQueryBuilder('module')
      .leftJoin('module.actions', 'action')
      .select(['module.id', 'module.name', 'module.desc', 'action.name']) // Chỉ lấy `name` của action
      .getMany();

    return {
      success: true,
      message: 'Lấy danh sách module thành công',
      data: modules,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
