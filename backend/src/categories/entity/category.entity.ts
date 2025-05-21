import { Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'categories', schema: 'PLANNING' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ length: 7 })
  color: string;

  @Column()
  @Type(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Type(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn({ nullable: true })
  @Type(() => Date)
  deletedAt?: Date;
}
