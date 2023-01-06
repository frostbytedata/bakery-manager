import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Conversion } from './Conversion';
import { Unit } from './Unit';
import { OwnableNameableEntity } from './OwnableNameableEntity';
import { IsNumber } from 'class-validator';
import { RecipeToIngredient } from './RecipeToIngredient';

@Entity()
export class Ingredient extends OwnableNameableEntity {
  @ManyToOne(() => Unit)
  @JoinColumn()
  defaultUnit: Unit;

  @Column({
    type: 'decimal',
    default: 0,
  })
  @IsNumber()
  cost: number;
  // Both decimal and bigint types from database may contain values
  // that are too large to "fit" in JavaScript's Number. therefore
  // we need to convert the cost to a number before returning it
  // to the client.
  @AfterLoad()
  costAsNumber() {
    this.cost = Number(this.cost) as number;
  }

  @Column({ nullable: true })
  defaultUnitId: number;

  @OneToMany(() => Conversion, (conversion) => conversion.ingredient)
  conversions: Conversion[];

  @OneToMany(() => RecipeToIngredient, recipeToIngredient => recipeToIngredient.ingredient)
  public recipeToIngredients!: RecipeToIngredient[];
}
