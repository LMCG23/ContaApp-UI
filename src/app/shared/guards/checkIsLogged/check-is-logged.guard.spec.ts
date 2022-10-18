import { TestBed } from '@angular/core/testing';

import { CheckIsLoggedGuard } from './check-is-logged.guard';

describe('CheckIsLoggedGuard', () => {
  let guard: CheckIsLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIsLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
