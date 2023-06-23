import { TestBed } from '@angular/core/testing';

import { HsnTypeService } from './hsn-type.service';

describe('HsnTypeService', () => {
  let service: HsnTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HsnTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
