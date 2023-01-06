import { TestBed } from '@angular/core/testing';

import { SelectIngredientDialogService } from './select-ingredient.dialog.service';

describe('AddIngredientDialogServiceService', () => {
  let service: SelectIngredientDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectIngredientDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
