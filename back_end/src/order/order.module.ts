import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { BlackListModule } from 'src/black-list/black-list.module';
import { DiscountModule } from 'src/discount/discount.module';
import { OrderNotificationModule } from 'src/order-notification/order-notification.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderDetailModule,
    BlackListModule,
    UserModule,
    DiscountModule,
    OrderNotificationModule,
    NotificationsModule,
  ],
})
export class OrderModule {}
