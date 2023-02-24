import { TestBed } from '@angular/core/testing';

import { AddIngredientDialogService } from './add-ingredient.dialog.service';

describe('AddIngredientDialogServiceService', () => {
  let service: AddIngredientDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddIngredientDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
