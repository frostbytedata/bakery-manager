import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';
import { OwnableNameableEntity } from './OwnableNameableEntity';
import { IsNumber } from 'class-validator';
import { Ingredient } from './Ingredient';
import { RecipeToIngredient } from './RecipeToIngredient';

@Entity()
export class Recipe extends OwnableNameableEntity {
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

  @OneToMany(
    () => RecipeToIngredient,
    (recipeToIngredient) => recipeToIngredient.recipe,
  )
  ingredients!: RecipeToIngredient[];
}
