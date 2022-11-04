import { Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity({
  synchronize: false,
})
export class OwnableEntity extends BaseEntity {
  @ManyToOne(() => User)
  user: User;
}
