import { TestBed } from '@angular/core/testing';

import { AddPurchaseService } from './add-purchase.service';

describe('AddPurchaseService', () => {
  let service: AddPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
