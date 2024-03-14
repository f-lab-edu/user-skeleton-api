import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentBuilder = new DocumentBuilder()
  .setTitle("User API")
  .setDescription("This is a sample RESTful User API")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
