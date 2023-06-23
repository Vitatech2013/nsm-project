import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerAggridComponent } from './inner-aggrid.component';

describe('InnerAggridComponent', () => {
  let component: InnerAggridComponent;
  let fixture: ComponentFixture<InnerAggridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerAggridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerAggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
