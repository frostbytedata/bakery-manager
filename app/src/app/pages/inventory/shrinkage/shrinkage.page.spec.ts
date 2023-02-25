import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrinkagePage } from './shrinkage.page';

describe('HomePage', () => {
  let component: ShrinkagePage;
  let fixture: ComponentFixture<ShrinkagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShrinkagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShrinkagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
