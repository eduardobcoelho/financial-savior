import { Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users', schema: 'AUTH' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

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
