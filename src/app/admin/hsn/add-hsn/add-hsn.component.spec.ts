import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHSNComponent } from './add-hsn.component';

describe('AddHSNComponent', () => {
  let component: AddHSNComponent;
  let fixture: ComponentFixture<AddHSNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHSNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
