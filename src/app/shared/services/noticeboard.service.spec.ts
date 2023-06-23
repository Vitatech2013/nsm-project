import { TestBed } from '@angular/core/testing';

import { NoticeboardService } from './noticeboard.service';

describe('NoticeboardService', () => {
  let service: NoticeboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
