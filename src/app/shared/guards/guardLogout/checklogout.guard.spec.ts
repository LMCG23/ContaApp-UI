import { TestBed } from '@angular/core/testing';

import { ChecklogoutGuard } from './checklogout.guard';

describe('ChecklogoutGuard', () => {
  let guard: ChecklogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChecklogoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
