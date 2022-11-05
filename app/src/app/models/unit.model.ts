import { BaseModel } from './base.model';

export interface Unit extends BaseModel {
  name: string;
  description: string;
  type: string;
  abbr: string;
}
