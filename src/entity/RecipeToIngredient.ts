import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import { Unit } from './Unit';
import { BaseEntity } from './BaseEntity';
import { IsNumber } from 'class-validator';

@Entity()
export class RecipeToIngredient extends BaseEntity {
  @Column()
  public recipeId!: number;

  @Column()
  public ingredientId!: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  @IsNumber()
  quantity: number;
  // Both decimal and bigint types from database may contain values
  // that are too large to "fit" in JavaScript's Number. therefore
  // we need to convert the quantity to a number before returning it
  // to the client.
  @AfterLoad()
  quantityAsNumber() {
    this.quantity = Number(this.quantity) as number;
  }

  @ManyToOne(() => Unit)
  public unit!: Unit;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  public recipe!: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeToIngredients)
  public ingredient!: Ingredient;
}
