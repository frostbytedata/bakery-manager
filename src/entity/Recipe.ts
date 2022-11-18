import { AfterLoad, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { OwnableNameableEntity } from './OwnableNameableEntity';
import { IsNumber } from 'class-validator';
import { Ingredient } from './Ingredient';

@Entity()
export class Recipe extends OwnableNameableEntity {
  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @Column({
    type: 'decimal',
    default: 0,
  })
  @IsNumber()
  retailPrice: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  @IsNumber()
  wholesalePrice: number;

  // Both decimal and bigint types from database may contain values
  // that are too large to "fit" in JavaScript's Number. therefore
  // we need to convert the cost to a number before returning it
  // to the client.
  @AfterLoad()
  priceAsNumber() {
    this.retailPrice = Number(this.retailPrice) as number;
    this.wholesalePrice = Number(this.wholesalePrice) as number;
  }
}
