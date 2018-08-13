import { TestBed, inject } from '@angular/core/testing';

import { CitieslistService } from '../services/citieslist.service';

describe('CitieslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitieslistService]
    });
  });

  it('should be created', inject([CitieslistService], (service: CitieslistService) => {
    expect(service).toBeTruthy();
  }));
});
