import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { first, tap } from 'rxjs';
import { AddIngredientDialogService } from '../../components/add-ingredient/add-ingredient.dialog.service';
@Component({
  selector: 'bm-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
})
export class IngredientsPage
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  ingredients: Ingredient[] = [];
  loading = true;
  constructor(
    private ingredientService: IngredientService,
    private addIngredientDialogService: AddIngredientDialogService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getIngredients();
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
          this.getIngredients();
        }
      });
  }
}
