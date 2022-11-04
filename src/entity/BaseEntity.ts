import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate } from 'class-validator';

@Entity({
  synchronize: false,
})
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  @IsBoolean()
  global: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @IsDate()
  deletedAt: Date;
}
