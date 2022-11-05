import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientStore {
  private readonly _data: any = {
    ingredients: {} as Ingredient[],
  };
  public get data() {
    return this._data;
  }

  constructor() {}

  ngOnInit() {}

  modify(propertyName: string, newValue: any) {
    if (this._data.hasOwnProperty(propertyName) && newValue) {
      if (typeof newValue === 'string' || typeof newValue === 'number') {
        this._data[propertyName] = newValue;
      } else {
        this._data[propertyName] = Object.assign({}, newValue);
      }
    }
  }
}
