import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { BlackList } from './black-list/entities/black-list.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlackListModule } from './black-list/black-list.module';
import { UserToken } from './auth/entities/user_token.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { DiscountModule } from './discount/discount.module';
import { Discount } from './discount/entities/discount.entity';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { Manufacturer } from './manufacturer/entities/manufacturer.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductModule } from './product/product.module';
import { Unit } from './product/unit/entities/unit.entity';
import { Product } from './product/entities/product.entity';
import { Ingredient } from './product/ingredient/entities/ingredient.entity';
import { ProductImage } from './product/product_image/entities/product_image.entity';
import { Variant } from './product/variant/entities/variant.entity';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { RbacModule } from './rbac/rbac.module';
import { Permission } from './rbac/permission/entities/permission.entity';
import { Role } from './rbac/role/entities/role.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartProduct } from './cart/cart_product/entities/cart_product.entity';
import { Order } from './order/entities/order.entity';
import { OrderDetail } from './order/order_detail/entities/order_detail.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          BlackList,
          UserToken,
          Category,
          Discount,
          Manufacturer,
          Unit,
          Product,
          Ingredient,
          ProductImage,
          Variant,
          Permission,
          Role,
          Cart,
          CartProduct,
          Order,
          OrderDetail,
        ],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    BlackListModule,
    CategoryModule,
    DiscountModule,
    ManufacturerModule,
    CloudinaryModule,
    ProductModule,
    OrderModule,
    CartModule,
    ReviewModule,
    RbacModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
