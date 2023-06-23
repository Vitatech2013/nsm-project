import { TestBed } from '@angular/core/testing';

import { PosBillService } from './pos-bill.service';

describe('PosBillService', () => {
  let service: PosBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
