import { Controller, Body, Param, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  private readonly logger = new Logger(BookController.name);

  @MessagePattern('create-book')
  create(@Payload() data: CreateBookDto): Promise<CreateBookDto> {
    this.logger.log(
      `Received create-book message with data: ${JSON.stringify(data)}`,
    );
    return this.bookService.create(data);
  }

  @MessagePattern('find-all-book')
  findAll() {
    return this.bookService.findAll();
  }

  @MessagePattern('find-book')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @MessagePattern('update-book')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @MessagePattern('update-book-status')
  updateStatus(@Param('id') id: string) {
    return this.bookService.updateStatus(+id);
  }

  @MessagePattern('delete-book')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
