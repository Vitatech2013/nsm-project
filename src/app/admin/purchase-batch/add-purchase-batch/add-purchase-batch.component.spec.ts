import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseBatchComponent } from './add-purchase-batch.component';

describe('AddPurchaseBatchComponent', () => {
  let component: AddPurchaseBatchComponent;
  let fixture: ComponentFixture<AddPurchaseBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
