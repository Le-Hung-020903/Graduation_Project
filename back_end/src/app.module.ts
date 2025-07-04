import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { FavoriteProduct } from './product/favorite_product/entities/favorite_product.entity';
import { Comment } from './product/comment/entities/comment.entity';
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/entities/inventory.entity';
import { Transaction } from './product/transaction/entities/transaction.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { CommentPost } from './post/comment_post/entities/comment_post.entity';
import { Modules } from './modules/entities/module.entity';
import { Action } from './modules/action/entities/action.entity';
import { ModulesModule } from './modules/modules.module';
import { Address } from './user/address/entities/address.entity';
import { CommentModule } from './product/comment/comment.module';
import { FavoriteProductModule } from './product/favorite_product/favorite_product.module';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';
import { BrevoEmailController } from './brevo-email/brevo-email.controller';
import { BrevoEmailService } from './brevo-email/brevo-email.service';
import { BrevoEmailModule } from './brevo-email/brevo-email.module';
import { GoogleGenerativeAiModule } from './google-generative-ai/google-generative-ai.module';
import { OrderNotificationModule } from './order-notification/order-notification.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
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
          FavoriteProduct,
          Comment,
          Inventory,
          Discount,
          Transaction,
          Post,
          CommentPost,
          Modules,
          Action,
          Address,
          Notification,
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
    RbacModule,
    InventoryModule,
    PostModule,
    ModulesModule,
    CommentModule,
    FavoriteProductModule,
    BrevoEmailModule,
    GoogleGenerativeAiModule,
    OrderNotificationModule,
    NotificationsModule,
  ],
  controllers: [AppController, BrevoEmailController],
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
    BrevoEmailService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'product', method: RequestMethod.GET },
        { path: 'product/{*splat}', method: RequestMethod.GET },
      );
  }
}
