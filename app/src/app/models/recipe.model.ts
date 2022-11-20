import { BaseModel } from './base.model';
import { Ingredient } from './ingredient.model';

export interface Recipe extends BaseModel {
  id?: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  retailPrice: number;
  wholesalePrice: number;
}

export interface RecipeDto {
  id?: number | null;
  name: string;
  description: string;
  ingredients?: Ingredient[];
  retailPrice: number;
  wholesalePrice: number;
}
