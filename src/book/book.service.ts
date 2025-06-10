import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  async updateStatus(id: number) {
    const book = await this.bookRepository.findOneOrFail({ where: { id } });
    if (book.status == 'disponivel') {
      return this.bookRepository.update(id, { status: 'indisponivel' });
    }
    return this.bookRepository.update(id, { status: 'disponivel' });
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
