import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Role } from './Role';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
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
}
