import { TestBed } from '@angular/core/testing';

import { MedicineCategoryService } from './medicine-category.service';

describe('MedicineCategoryService', () => {
  let service: MedicineCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
