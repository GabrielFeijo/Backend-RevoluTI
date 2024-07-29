import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');

  const port = process.env.PORT || 3000;

  const options = new DocumentBuilder()
    .setTitle('Desafio RevolutiTI - Gabriel Feijó')
    .setDescription(
      'API para gerenciamento de endereços, permitindo a criação, atualização, exclusão e consulta de endereços.',
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`, 'Local environment')
    .addServer('https://production.revoluti.com/', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/documentation', app, document);

  await app.listen(port);
}
bootstrap();
