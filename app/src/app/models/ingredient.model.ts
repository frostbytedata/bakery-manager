import { BaseModel } from './base.model';
import { Unit } from './unit.model';

export interface Ingredient extends BaseModel {
  id?: number;
  name: string;
  description: string;
  defaultUnit: Unit;
}

export interface IngredientDto {
  id?: number;
  name: string;
  description: string;
  defaultUnitId: number;
}
