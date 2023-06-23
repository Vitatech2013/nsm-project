import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentTypeComponent } from './new-payment-type.component';

describe('NewPaymentTypeComponent', () => {
  let component: NewPaymentTypeComponent;
  let fixture: ComponentFixture<NewPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaymentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
