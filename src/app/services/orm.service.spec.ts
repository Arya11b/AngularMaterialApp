import { TestBed, inject } from '@angular/core/testing';

import { OrmService } from './orm.service';

describe('OrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrmService]
    });
  });

  it('should be created', inject([OrmService], (service: OrmService) => {
    expect(service).toBeTruthy();
  }));
});
