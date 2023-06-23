import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemsReportsComponent } from './purchase-items-reports.component';

describe('PurchaseItemsReportsComponent', () => {
  let component: PurchaseItemsReportsComponent;
  let fixture: ComponentFixture<PurchaseItemsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseItemsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseItemsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
