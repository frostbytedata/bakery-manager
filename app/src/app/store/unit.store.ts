import { Injectable } from '@angular/core';
import { BaseStore } from './base.store';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitStore extends BaseStore {
  constructor() {
    super({
      units: [] as Unit[],
    });
  }
}
