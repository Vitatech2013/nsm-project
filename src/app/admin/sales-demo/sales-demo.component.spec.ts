import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDemoComponent } from './sales-demo.component';

describe('SalesDemoComponent', () => {
  let component: SalesDemoComponent;
  let fixture: ComponentFixture<SalesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
