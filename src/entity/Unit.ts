import { Column, Entity } from 'typeorm'
import { IsEnum } from 'class-validator'
import { BaseEntity } from './Base'
import { Nameable } from './Nameable'

enum UnitType {
  Weight,
  Volume
}

@Entity()
export class Unit extends BaseEntity {
  @Column()
  @IsEnum(UnitType)
  type: UnitType

  @Column(() => Nameable, {
    prefix: false,
  })
  nameable: Nameable
}
