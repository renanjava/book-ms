/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  private readonly logger = new Logger(BookController.name);

  @MessagePattern('create-book')
  create(@Payload('body') body: CreateBookDto): Promise<Book> {
    this.logger.log(
      `Received create-book message with data: ${JSON.stringify(body)}`,
    );
    return this.bookService.create(body);
  }

  @MessagePattern('find-all-book')
  findAll(): Promise<Book[]> {
    this.logger.log('Received find-all-book message');
    return this.bookService.findAll();
  }

  @MessagePattern('find-book')
  async findOne(@Payload('id') id: string): Promise<string> {
    this.logger.log('Received find-book message with id:', id);
    const book = await this.bookService.findOne(+id);
    return JSON.stringify(book);
  }

  @MessagePattern('update-book')
  async update(
    @Payload('id') id: string,
    @Payload('body') body,
  ): Promise<string> {
    this.logger.log(
      `Received update-book message with id: ${id} and data: ${JSON.stringify(body)}`,
    );
    const book = await this.bookService.update(+id, body);
    return JSON.stringify(book);
  }

  @MessagePattern('update-book-status')
  async updateStatus(@Payload('id') id: string) {
    this.logger.log(`Received update-book-status message with id: ${id}`);
    const book = await this.bookService.updateStatus(+id);
    return JSON.stringify(book);
  }

  @MessagePattern('delete-book')
  async remove(@Payload('id') id: string) {
    this.logger.log(`Received delete-book message with id: ${id}`);
    const book = await this.bookService.remove(+id);
    return JSON.stringify(book);
  }
}
