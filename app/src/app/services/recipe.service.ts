import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnsubscribeOnDestroyAdapter } from '../shared/unsub-on-destroy';
import { RecipeStore } from '../store/recipe.store';
import { map, of, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AddIngredientToRecipeDto, RecipeDto } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends UnsubscribeOnDestroyAdapter {
  path = '/recipe';
  constructor(
    private baseService: BaseService,
    private recipeStore: RecipeStore,
  ) {
    super();
  }

  getOne(id: number) {
    return this.baseService.get(`${this.path}/${id}`);
  }

  private updateRecipesList() {
    return this.baseService.get(`${this.path}?amount=1000`).pipe(
      map((resp: HttpResponse<any>) => resp?.body?.data),
      tap((recipes: any) => {
        this.recipeStore.modify('recipes', recipes);
      }),
    );
  }

  getAll(pull?: boolean) {
    if (this.recipeStore.data.recipes.length > 0 && !pull) {
      return of(this.recipeStore.data.recipes);
    } else {
      return this.updateRecipesList();
    }
  }

  save(recipe: RecipeDto) {
    return this.baseService.post(`${this.path}`, recipe).pipe(
      tap((resp: HttpResponse<any>) => {
        this.subs.sink = this.updateRecipesList().subscribe();
      }),
    );
  }

  addIngredient(addIngredientToRecipe: AddIngredientToRecipeDto) {
    return this.baseService.post(
      `${this.path}/ingredient`,
      addIngredientToRecipe,
    );
  }

  removeIngredient(ingredientId: number) {
    return this.baseService.delete(ingredientId, `${this.path}/ingredient`);
  }
}
