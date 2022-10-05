import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TasksService } from './task.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(TasksService);
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
