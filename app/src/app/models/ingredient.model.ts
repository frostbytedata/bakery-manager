import { BaseModel } from './base.model';
import { Unit } from './unit.model';

export interface Ingredient extends BaseModel {
  id?: number;
  name: string;
  description: string;
  cost: number;
  defaultUnit: Unit;
}

export interface IngredientDto {
  id?: number;
  name: string;
  description: string;
  cost: number;
  defaultUnitId: number;
}
