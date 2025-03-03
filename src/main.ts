import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PortNotDefinedException } from './exceptions/port-not-defined.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);

  if (!PORT) {
    throw new PortNotDefinedException();
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest js practice')
    .setDescription(
      'Practice using nest to explore the capabilities of the framework',
    )
    .setVersion('1.0.0')
    .addTag('petrakowww')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe()); // пример, что можно использовать пайпы глобально для всего приложения, если есть class-validator

  await app.listen(PORT, () => console.log(`Server started on port=${PORT}`));
}

start();
