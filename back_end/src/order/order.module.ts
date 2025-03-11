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

@Module({
  controllers: [OrderController],
  providers: [OrderService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderDetailModule,
    BlackListModule,
    UserModule,
    DiscountModule,
  ],
})
export class OrderModule {}
