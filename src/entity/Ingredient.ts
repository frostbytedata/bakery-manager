import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Conversion } from './Conversion';
import { Unit } from './Unit';
import { OwnableNameableEntity } from './OwnableNameableEntity';

@Entity()
export class Ingredient extends OwnableNameableEntity {
  @ManyToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit;

  @Column({ nullable: true })
  defaultUnitId: number;

  @OneToMany(() => Conversion, (conversion) => conversion.ingredient)
  conversions: Conversion[];
}
