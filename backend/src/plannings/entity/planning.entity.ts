import { Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'plannings', schema: 'PLANNING' })
export class PlanningEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
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
