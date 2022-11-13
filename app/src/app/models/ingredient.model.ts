import { BaseModel } from './base.model';
import { Unit } from './unit.model';

export interface Ingredient extends BaseModel {
  name: string;
  description: string;
  defaultUnit: Unit;
}

export interface IngredientDto {
  name: string;
  description: string;
  defaultUnitId: number;
}
