import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosBillComponent } from './pos-bill.component';

describe('PosBillComponent', () => {
  let component: PosBillComponent;
  let fixture: ComponentFixture<PosBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
