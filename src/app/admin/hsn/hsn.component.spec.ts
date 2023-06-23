import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSNComponent } from './hsn.component';

describe('HSNComponent', () => {
  let component: HSNComponent;
  let fixture: ComponentFixture<HSNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HSNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
