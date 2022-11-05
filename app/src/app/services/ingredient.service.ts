import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnsubscribeOnDestroyAdapter } from '../shared/unsub-on-destroy';
import { IngredientStore } from '../store/ingredient.store';

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

  getAll() {
    return this.baseService.get(`${this.path}`);
  }

  save() {}

  delete() {}
}
