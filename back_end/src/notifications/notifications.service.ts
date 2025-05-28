import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto): Promise<{
    success: boolean;
    message: string;
    data: Notification[];
  }> {
    const notifications = [
      this.notificationRepository.create({
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        user_redirec_url: createNotificationDto.user_redirect_url ?? '',
        is_read: false,
        user: { id: createNotificationDto.user_id },
        receiver_role: 'USER',
      }),
      this.notificationRepository.create({
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        admin_redirec_url: createNotificationDto.admin_redirect_url ?? '',
        is_read: false,
        user: { id: createNotificationDto.user_id },
        receiver_role: 'ADMIN',
      }),
    ];
    await this.notificationRepository.save(notifications);
    return {
      success: true,
      message: 'Tạo thông báo thành công',
      data: notifications,
    };
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
