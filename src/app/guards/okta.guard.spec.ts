import { TestBed } from '@angular/core/testing';

import { OktaGuard } from './okta.guard';

describe('OktaGuard', () => {
  let guard: OktaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OktaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
