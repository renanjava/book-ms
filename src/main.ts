import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'book',
          brokers: ['localhost:9092'],
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
