import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt;

  @DeleteDateColumn({ type: 'timestamp' })
  @IsDate()
  deletedAt: Date;
}
