import { Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_tokens', schema: 'AUTH' })
export class UserTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  revoked: boolean;

  @Column()
  @Type(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
