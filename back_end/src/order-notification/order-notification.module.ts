import { Module } from '@nestjs/common';
import { orderNotificationGateway } from './order-notification-gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [orderNotificationGateway],
  exports: [orderNotificationGateway],
})
export class OrderNotificationModule {}
