import { TestBed } from '@angular/core/testing';

import { PlaygroundApiService } from './playground-api.service';

describe('PlaygroundApiService', () => {
  let service: PlaygroundApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaygroundApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
