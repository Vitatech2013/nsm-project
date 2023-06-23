import { TestBed } from '@angular/core/testing';

import { SalesItemsReturnService } from './sales-items-return.service';

describe('SalesItemsReturnService', () => {
  let service: SalesItemsReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesItemsReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
