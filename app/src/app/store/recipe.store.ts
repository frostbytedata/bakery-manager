import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class RecipeStore extends BaseStore {
  constructor() {
    super({
      recipes: [] as Recipe[],
    });
  }
}
