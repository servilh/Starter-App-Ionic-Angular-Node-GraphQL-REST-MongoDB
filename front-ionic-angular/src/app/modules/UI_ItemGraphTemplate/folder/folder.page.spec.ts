import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { TasksGqlService } from 'src/app/services/task-gql.service';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';


describe('FolderPage', () => {
  let component: FolderPage;
  let fixture: ComponentFixture<FolderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FolderPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => "12" },
            }
          },
        },
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
        TasksGqlService],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),
        HttpClientModule, ApolloModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
