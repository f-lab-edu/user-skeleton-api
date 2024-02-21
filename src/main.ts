import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentBuilder = new DocumentBuilder()
  .setTitle("User API")
  .setDescription("This is a sample RESTful User API")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
