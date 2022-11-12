import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsOptional, IsString } from 'class-validator';

@Entity({
  synchronize: false,
})
export class NameableEntity extends BaseEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;
}
