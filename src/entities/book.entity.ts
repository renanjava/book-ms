import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  titulo: string;

  @Column('text')
  author: string;

  @Column('text')
  status: string;
}
