import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { goToHomeGuard } from './go-to-home.guard';

describe('goToHomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => goToHomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
