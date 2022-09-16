import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const appPort =
    process.env.DOCKER === 'ENABLE'
      ? process.env.APP_PORT_INT
      : process.env.APP_PORT_EXT;
  console.log(`server running on port ${appPort}`);
  await app.listen(appPort);
}
bootstrap();
