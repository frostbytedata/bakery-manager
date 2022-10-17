import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { IsDecimal } from 'class-validator'
import { Unit } from './Unit'
import { Ingredient } from './Ingredient'
import { BaseEntity } from './Base'

@Entity()
export class Conversion extends BaseEntity {

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.conversions)
  ingredient: Ingredient

  @ManyToMany(() => Unit)
  @JoinTable()
  unit1: Unit[]

  @ManyToMany(() => Unit)
  @JoinTable()
  unit2: Unit[]

  @Column()
  @IsDecimal()
  rate: number

}
