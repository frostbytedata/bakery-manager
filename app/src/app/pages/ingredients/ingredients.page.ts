import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { tap } from 'rxjs';
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
    this.subs.sink = this.ingredientService
      .getAll()
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

  openEditModal(event: Event) {
    console.info('openEditModal', event);
    const dialogRef = this.addIngredientDialogService.open();
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
