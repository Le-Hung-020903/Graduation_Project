import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('create')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('client')
  findAll(@Req() req) {
    const userId: number = req.user?.id;
    return this.notificationsService.findAllClient(userId);
  }
  @Get('admin')
  findAllAdmin(@Req() req) {
    const userId: number = req.user?.id;
    return this.notificationsService.findAllAdmin(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    return this.notificationsService.updateNotification(
      +id,
      updateNotificationDto,
      userId,
    );
  }

  @Delete(':id')
  removeNotification(@Param('id') id: string) {
    return this.notificationsService.removeNotification(+id);
  }
}
