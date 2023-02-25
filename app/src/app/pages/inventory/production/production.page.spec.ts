import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPage } from './production.page';

describe('HomePage', () => {
  let component: ProductionPage;
  let fixture: ComponentFixture<ProductionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
