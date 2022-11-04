import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Conversion } from './Conversion';
import { Unit } from './Unit';
import { OwnableNameableEntity } from './OwnableNameableEntity';

@Entity()
export class Ingredient extends OwnableNameableEntity {
  @OneToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit;

  @OneToMany(() => Conversion, (conversion) => conversion.ingredient)
  conversions: Conversion[];
}
