import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCategoryComponent } from './medicine-category.component';

describe('MedicineCategoryComponent', () => {
  let component: MedicineCategoryComponent;
  let fixture: ComponentFixture<MedicineCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
