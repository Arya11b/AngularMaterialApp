import { TestBed, inject } from '@angular/core/testing';

import { SuperpowerslistService } from '../services/superpowerslist.service';

describe('SuperpowerslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperpowerslistService]
    });
  });

  it('should be created', inject([SuperpowerslistService], (service: SuperpowerslistService) => {
    expect(service).toBeTruthy();
  }));
});
