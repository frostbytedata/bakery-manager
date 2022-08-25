import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsEmail, IsString, IsUUID } from 'class-validator';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({ select: false })
  @IsString()
  salt: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt;

  @DeleteDateColumn({ type: 'timestamp' })
  @IsDate()
  deletedAt: Date;
}
