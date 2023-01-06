import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIngredientDialog } from './select-ingredient.dialog';

describe('AddIngredientDialogComponent', () => {
  let component: SelectIngredientDialog;
  let fixture: ComponentFixture<SelectIngredientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectIngredientDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectIngredientDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
