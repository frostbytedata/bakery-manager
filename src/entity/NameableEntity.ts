import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsString } from 'class-validator';

@Entity({
  synchronize: false,
})
export class NameableEntity extends BaseEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;
}
