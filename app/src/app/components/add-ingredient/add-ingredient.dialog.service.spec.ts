import { TestBed } from '@angular/core/testing';

import { AddIngredientDialogServiceService } from './add-ingredient.dialog.service.service';

describe('AddIngredientDialogServiceService', () => {
  let service: AddIngredientDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddIngredientDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
