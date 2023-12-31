import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsComponent } from './new-product.component';

describe('NewProductsComponent', () => {
  let component: NewProductsComponent;
  let fixture: ComponentFixture<NewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
