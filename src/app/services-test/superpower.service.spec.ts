import { TestBed, inject } from '@angular/core/testing';

import { SuperpowerService } from '../services/superpower.service';

describe('SuperpowerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperpowerService]
    });
  });

  it('should be created', inject([SuperpowerService], (service: SuperpowerService) => {
    expect(service).toBeTruthy();
  }));
});
