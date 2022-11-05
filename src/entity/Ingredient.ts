import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Conversion } from './Conversion';
import { Unit } from './Unit';
import { OwnableNameableEntity } from './OwnableNameableEntity';

@Entity()
export class Ingredient extends OwnableNameableEntity {
  @OneToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit;

  @Column({ nullable: true })
  defaultUnitId: number;

  @OneToMany(() => Conversion, (conversion) => conversion.ingredient)
  conversions: Conversion[];
}
