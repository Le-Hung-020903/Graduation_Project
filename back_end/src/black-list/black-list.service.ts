import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlackList } from './entities/black-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlackListService {
  constructor(
    @InjectRepository(BlackList)
    private readonly blackListRepository: Repository<BlackList>,
  ) {}
  async checkAccessToken(token: string) {
    const blackList = await this.blackListRepository.findOne({
      where: { token: token },
    });
    return !!blackList;
  }

  async addAccessToken(token: string, exp: number) {
    const blackList = this.blackListRepository.create({
      token: token,
      expired: exp,
    });
    return await this.blackListRepository.save(blackList);
  }
}
