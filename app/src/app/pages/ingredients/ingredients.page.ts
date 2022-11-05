import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
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
  constructor(
    public route: ActivatedRoute,
    private ingredientService: IngredientService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.ingredientService
      .getAll()
      .pipe(map((resp: HttpResponse<any>) => resp?.body?.data))
      .subscribe((ings: Ingredient[]) => {
        this.ingredients = ings;
      });
  }
}
