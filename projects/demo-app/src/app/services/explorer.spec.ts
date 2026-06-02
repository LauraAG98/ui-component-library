import { TestBed } from '@angular/core/testing';

import { Explorer } from './explorer';

describe('Explorer', () => {
  let service: Explorer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Explorer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
