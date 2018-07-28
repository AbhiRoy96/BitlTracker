import { TestBed, inject } from '@angular/core/testing';

import { LivedataService } from './livedata.service';

describe('LivedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivedataService]
    });
  });

  it('should be created', inject([LivedataService], (service: LivedataService) => {
    expect(service).toBeTruthy();
  }));
});
