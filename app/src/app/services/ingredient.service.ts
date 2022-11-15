import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnsubscribeOnDestroyAdapter } from '../shared/unsub-on-destroy';
import { IngredientStore } from '../store/ingredient.store';
import { map, of, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IngredientDto } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService extends UnsubscribeOnDestroyAdapter {
  path = '/ingredient';
  constructor(
    private baseService: BaseService,
    private ingredientStore: IngredientStore,
  ) {
    super();
  }

  getOne(id: number) {
    return this.baseService.get(`${this.path}/${id}`);
  }

  private updateIngredientsList() {
    return this.baseService.get(`${this.path}?amount=1000`).pipe(
      map((resp: HttpResponse<any>) => resp?.body?.data),
      tap((ingredients: any) => {
        this.ingredientStore.modify('ingredients', ingredients);
      }),
    );
  }

  getAll(pull?: boolean) {
    if (this.ingredientStore.data.ingredients.length > 0 && !pull) {
      return of(this.ingredientStore.data.ingredients);
    } else {
      return this.updateIngredientsList();
    }
  }

  save(ingredient: IngredientDto) {
    return this.baseService.post(`${this.path}`, ingredient).pipe(
      tap((resp: HttpResponse<any>) => {
        this.subs.sink = this.updateIngredientsList().subscribe();
      }),
    );
  }

  delete() {}
}
