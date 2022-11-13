import { TestBed } from '@angular/core/testing';

import { BaseStore } from './base.store';

describe('BaseStoreService', () => {
  let service: BaseStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
