import { TestBed } from '@angular/core/testing';

import { RecipeStore } from './recipe.store';

describe('RecipeStoreService', () => {
  let service: RecipeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
