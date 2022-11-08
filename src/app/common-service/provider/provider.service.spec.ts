import { TestBed } from '@angular/core/testing';

import { Provider } from './provider.service';

describe('ContractService', () => {
  let service: Provider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Provider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
