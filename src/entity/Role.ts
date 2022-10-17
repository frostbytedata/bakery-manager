import { Column, Entity, } from 'typeorm'
import { BaseEntity } from './Base'
import { Nameable } from './Nameable'

@Entity()
export class Role extends BaseEntity {
  @Column(() => Nameable, {
    prefix: false,
  })
  nameable: Nameable
}
