import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterReportsComponent } from './waiter-reports.component';

describe('WaiterReportsComponent', () => {
  let component: WaiterReportsComponent;
  let fixture: ComponentFixture<WaiterReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
