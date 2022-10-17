import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Conversion } from './Conversion'
import { Nameable } from './Nameable'
import { Unit } from './Unit'

@Entity()
export class Ingredient {

  @Column(() => Nameable, {
    prefix: false,
  })
  nameable: Nameable

  @OneToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit

  @OneToMany(() => Conversion, (cnversion) => cnversion.ingredient)
  conversions: Conversion[]

}
