import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchaseDemoComponent } from './new-purchase-demo.component';

describe('NewPurchaseDemoComponent', () => {
  let component: NewPurchaseDemoComponent;
  let fixture: ComponentFixture<NewPurchaseDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPurchaseDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPurchaseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
