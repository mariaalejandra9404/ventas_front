import { TestBed } from '@angular/core/testing';

import { TiendasServiceService } from './tiendas-service.service';

describe('TiendasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiendasServiceService = TestBed.get(TiendasServiceService);
    expect(service).toBeTruthy();
  });
});
