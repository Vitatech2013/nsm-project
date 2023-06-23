import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseTypeComponent } from './new-expense-type.component';

describe('NewExpenseTypeComponent', () => {
  let component: NewExpenseTypeComponent;
  let fixture: ComponentFixture<NewExpenseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpenseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
