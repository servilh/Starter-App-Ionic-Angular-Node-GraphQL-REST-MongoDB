import { TestBed } from '@angular/core/testing';

import { TasksGqlService } from './task-gql.service';

describe('TasksGqlService', () => {
  let service: TasksGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
