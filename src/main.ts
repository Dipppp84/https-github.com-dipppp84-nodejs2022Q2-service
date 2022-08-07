import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLogger } from './logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new MyLogger()
  });

  /**Validate*/
  app.useGlobalPipes(new ValidationPipe());

  /**Swagger*/
  const config = new DocumentBuilder()
    .setTitle('!Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  /**catch error*/
  process
    .on('unhandledRejection', event => {
      Logger.error('Unhandled Promise '+ event.toString());
    })
    .on('uncaughtException', err => {
      Logger.error(err, 'Uncaught Exception thrown');
      process.exit(1);
    });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
