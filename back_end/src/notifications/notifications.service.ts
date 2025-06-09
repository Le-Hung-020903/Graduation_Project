import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findAllClient(userId: number) {
    if (!userId) return;
    const notifications = await this.notificationRepository.find({
      where: {
        user: { id: userId },
        receiver_role: 'USER',
      },
      order: {
        created_at: 'DESC',
      },
    });
    return {
      success: true,
      message: 'Lấy thông báo thành công',
      data: notifications,
    };
  }

  async findAllAdmin(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Vui lòng đăng nhập để lấy thông báo');
    }

    const notifications = await this.notificationRepository.find({
      where: {
        receiver_role: 'ADMIN',
      },
      order: { created_at: 'DESC' },
    });

    return {
      success: true,
      message: 'Lấy thông báo thành công',
      data: notifications,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async updateNotification(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
    userId: number,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    updateNotificationDto.updated_at = new Date();
    if (!notification) {
      throw new NotFoundException('Không tìm thấy thông báo để cập nhật');
    }
    await this.notificationRepository.update(id, updateNotificationDto);
    return {
      success: true,
      message: 'Cập nhật thông báo thành công',
    };
  }
  async updateNotificationAdmin(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: id,
        receiver_role: 'ADMIN',
      },
    });

    updateNotificationDto.updated_at = new Date();
    if (!notification) {
      throw new NotFoundException('Không tìm thấy thông báo để cập nhật');
    }
    await this.notificationRepository.update(id, updateNotificationDto);
    return {
      success: true,
      message: 'Cập nhật thông báo thành công',
    };
  }

  async removeNotification(id: number): Promise<{
    success: boolean;
    message: string;
  }> {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!notification) {
      throw new NotFoundException('Không tìm thấy thông báo để xoá');
    }
    await this.notificationRepository.remove(notification);
    return {
      success: true,
      message: 'Xoá thông báo thành công',
    };
  }
}
