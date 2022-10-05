import { TestBed } from '@angular/core/testing';

import { GamesGqlService } from './games-gql.service';

describe('GamesGqlService', () => {
  let service: GamesGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
