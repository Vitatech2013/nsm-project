import { TestBed } from '@angular/core/testing';

import { SalesItemsService } from './sales-items.service';

describe('SalesItemsService', () => {
  let service: SalesItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
