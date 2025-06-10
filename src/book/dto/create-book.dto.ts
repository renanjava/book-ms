/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude } from 'class-transformer';
import { Book } from '../entities/book.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto implements Book {
  @Exclude()
  id: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsEnum(['disponivel', 'indisponivel'])
  status: string;
}
