import { TestBed } from '@angular/core/testing';

import { LoginImpService } from './login-imp.service';

describe('LoginImpService', () => {
  let service: LoginImpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginImpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
