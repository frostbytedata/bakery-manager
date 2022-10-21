import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Conversion } from './Conversion';
import { Unit } from './Unit';
import { NameableEntity } from './NameableEntity';

@Entity()
export class Ingredient extends NameableEntity {
  @OneToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit;

  @OneToMany(() => Conversion, (conversion) => conversion.ingredient)
  conversions: Conversion[];

}
