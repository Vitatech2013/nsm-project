import { TestBed } from '@angular/core/testing';

import { InventoryMedicinesService } from './products.service';

describe('ProductsService', () => {
  let service: InventoryMedicinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryMedicinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
