import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleItemsReportsComponent } from './sale-items-reports.component';

describe('SaleItemsReportsComponent', () => {
  let component: SaleItemsReportsComponent;
  let fixture: ComponentFixture<SaleItemsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleItemsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleItemsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
