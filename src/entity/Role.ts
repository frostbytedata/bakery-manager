import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsString } from 'class-validator';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

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
