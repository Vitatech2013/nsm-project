import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormattComponent } from './bill-formatt.component';

describe('BillFormattComponent', () => {
  let component: BillFormattComponent;
  let fixture: ComponentFixture<BillFormattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillFormattComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFormattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
