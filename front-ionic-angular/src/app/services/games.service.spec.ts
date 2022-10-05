import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#GetItems should return value from observable',
    (done: DoneFn) => {
    service.GetItems().subscribe(value => {
      expect(value.length).toBeGreaterThan(0);
      done();
    });
  });
  
});
