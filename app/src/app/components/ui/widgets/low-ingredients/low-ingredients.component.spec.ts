import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowIngredientsComponent } from './low-ingredients.component';

describe('LowIngredientsComponent', () => {
  let component: LowIngredientsComponent;
  let fixture: ComponentFixture<LowIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowIngredientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
