import { Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'sheets', schema: 'PLANNING' })
export class SheetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardId: number;

  @Column({ length: 100 })
  name: string;

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
