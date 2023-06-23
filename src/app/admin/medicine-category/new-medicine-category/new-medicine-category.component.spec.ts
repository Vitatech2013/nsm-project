import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicineCategoryComponent } from './new-medicine-category.component';

describe('NewMedicineCategoryComponent', () => {
  let component: NewMedicineCategoryComponent;
  let fixture: ComponentFixture<NewMedicineCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMedicineCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedicineCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
