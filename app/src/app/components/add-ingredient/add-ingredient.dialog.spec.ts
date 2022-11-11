import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientDialog } from './add-ingredient.dialog.component';

describe('AddIngredientDialogComponent', () => {
  let component: AddIngredientDialog;
  let fixture: ComponentFixture<AddIngredientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredientDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngredientDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
