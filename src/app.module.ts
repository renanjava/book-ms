import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_book_ms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
