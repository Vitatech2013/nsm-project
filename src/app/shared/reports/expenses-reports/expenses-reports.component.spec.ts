import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesReportsComponent } from './expenses-reports.component';

describe('ExpensesReportsComponent', () => {
  let component: ExpensesReportsComponent;
  let fixture: ComponentFixture<ExpensesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
