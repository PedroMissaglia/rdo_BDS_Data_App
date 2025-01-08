import { TestBed } from '@angular/core/testing';

import { PoMultiselectResponseService } from './po-multiselect-response.service';

describe('PoMultiselectResponseService', () => {
  let service: PoMultiselectResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoMultiselectResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
