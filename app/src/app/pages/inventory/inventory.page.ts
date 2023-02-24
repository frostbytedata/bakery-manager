import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { first, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { AddIngredientDialogService } from '../../components/add-ingredient/add-ingredient.dialog.service';

@Component({
  selector: 'bm-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];
  stats: any = {
    inventoryTotalValue: 263.24,
    itemsOnHand: 67,
    numberLowIngredients: 4,
  };
  loading = true;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private ingredientService: IngredientService,
    private addIngredientDialogService: AddIngredientDialogService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRecipes();
    this.getIngredients();
  }

  getRecipes(pull?: boolean) {
    this.subs.sink = this.recipeService
      .getAll(pull)
      .pipe(
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe({
        next: (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.loading = false;
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
        },
      });
  }

  goToRecipe(event: Event, id: number | 'new' | undefined): void {
    this.router.navigate(['recipes/' + id]);
  }

  getIngredients(pull?: boolean) {
    this.subs.sink = this.ingredientService
      .getAll(pull)
      .pipe(
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe({
        next: (ings: Ingredient[]) => {
          this.ingredients = ings;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      });
  }

  openEditModal(event: Event, ingredient?: Ingredient): void {
    const dialogRef = this.addIngredientDialogService.open(ingredient);
    this.subs.sink = dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.getIngredients(true);
        }
      });
  }
}
