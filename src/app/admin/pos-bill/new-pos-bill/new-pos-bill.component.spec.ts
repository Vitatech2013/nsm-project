import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPosBillComponent } from './new-pos-bill.component';

describe('NewPosBillComponent', () => {
  let component: NewPosBillComponent;
  let fixture: ComponentFixture<NewPosBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPosBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPosBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
