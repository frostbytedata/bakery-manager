import { Entity, ManyToOne } from 'typeorm';
import { NameableEntity } from './NameableEntity';
import { User } from './User';

@Entity({
  synchronize: false,
})
export class OwnableNameableEntity extends NameableEntity {
  @ManyToOne(() => User)
  user: User;
}
