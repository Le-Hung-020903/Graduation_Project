import { Module } from '@nestjs/common';
import { GoogleGenerativeAiService } from './google-generative-ai.service';
import { GoogleGenerativeAiController } from './google-generative-ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  controllers: [GoogleGenerativeAiController],
  providers: [GoogleGenerativeAiService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class GoogleGenerativeAiModule {}
