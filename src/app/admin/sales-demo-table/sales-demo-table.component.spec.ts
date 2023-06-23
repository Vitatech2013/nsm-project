import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDemoTableComponent } from './sales-demo-table.component';

describe('SalesDemoTableComponent', () => {
  let component: SalesDemoTableComponent;
  let fixture: ComponentFixture<SalesDemoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDemoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDemoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
