import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'
import { IsDate, IsString } from 'class-validator'

@Entity()
export class Nameable {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;
}
