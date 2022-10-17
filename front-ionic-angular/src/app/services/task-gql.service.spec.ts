import { TestBed } from '@angular/core/testing';
import { Apollo, ApolloBase, gql, MutationResult } from 'apollo-angular';
import { TasksGqlService } from './task-gql.service';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
describe('TasksGqlService', () => {
  let service: TasksGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
          useFactory(httpLink: HttpLink): NamedOptions {
            return {
              newClientName: {
                // <-- this settings will be saved by name: newClientName
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: 'http://localhost:4000/graphql',

                }),
              }
            };
          },
          deps: [HttpLink],
        },
      ],
      imports:[ApolloModule, HttpClientModule]
    }); 
    service = TestBed.inject(TasksGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
