import { TestBed, inject } from '@angular/core/testing';

import { QuoteServiceService } from './quote-service.service';

describe('QuoteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteServiceService]
    });
  });

  it('should be created', inject([QuoteServiceService], (service: QuoteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
