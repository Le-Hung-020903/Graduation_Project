import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (ValidationErrors) => {
        return new BadRequestException(
          ValidationErrors.map((error) => {
            return {
              [error.property]: error.constraints
                ? Object.values(error.constraints)[0]
                : 'Invalid value',
            };
          }),
        );
      },
      transformOptions: { enableImplicitConversion: true },
    }),
  ); // Tự động validate khi có request
  app.enableCors();
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('DO_AN')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // Giữ lại token sau khi reload
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
