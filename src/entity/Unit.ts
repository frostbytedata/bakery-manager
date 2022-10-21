import { Column, Entity } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';
import { NameableEntity } from './NameableEntity';

enum UnitType {
  WEIGHT = 'weight',
  VOLUME = 'volume',
}

@Entity()
export class Unit extends NameableEntity {
  @Column({
    type: 'enum',
    enum: UnitType,
    default: UnitType.VOLUME,
  })
  @IsEnum(UnitType)
  type: UnitType;

  @Column()
  @IsString()
  abbr: string;
}
