import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { BookModule } from './book.module';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'book',
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'book-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  logger.log('Book microservice is starting...');
  await app.listen();
}
void bootstrap();
