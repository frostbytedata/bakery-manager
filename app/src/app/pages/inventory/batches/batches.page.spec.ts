import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesPage } from './batches.page';

describe('HomePage', () => {
  let component: BatchesPage;
  let fixture: ComponentFixture<BatchesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
