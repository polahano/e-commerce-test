import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { goToAuthGuard } from './go-to-auth.guard';

describe('goToAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => goToAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
