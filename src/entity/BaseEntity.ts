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

  @UpdateDateColumn({ type: 'timestamptz' })
  @IsDate()
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @IsDate()
  deletedAt: Date;
}
