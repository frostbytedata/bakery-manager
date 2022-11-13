import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnsubscribeOnDestroyAdapter } from '../shared/unsub-on-destroy';
import { UnitStore } from '../store/unit.store';
import { map, of, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnitService extends UnsubscribeOnDestroyAdapter {
  path = '/unit';
  constructor(private baseService: BaseService, private unitStore: UnitStore) {
    super();
  }

  getOne(id: number) {
    return this.baseService.get(`${this.path}/${id}`);
  }

  getAll() {
    if (this.unitStore.data.units.length > 0) {
      return of(this.unitStore.data.units);
    } else {
      return this.baseService.get(`${this.path}`).pipe(
        map((resp: HttpResponse<any>) => resp?.body?.data),
        tap((units: any) => {
          this.unitStore.modify('units', units);
        }),
      );
    }
  }

  save() {}

  delete() {}
}
