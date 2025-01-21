import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // @TODO put into env, make conditional on running mode
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
