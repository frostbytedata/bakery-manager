import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class IngredientStore extends BaseStore {
  constructor() {
    super({
      ingredients: [] as Ingredient[],
    });
  }
}
