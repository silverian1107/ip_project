import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const logger = new Logger('Worker');

  await app.listen(1411);
  logger.debug(`Worker is running on ${1411} port!`);
}
bootstrap();
