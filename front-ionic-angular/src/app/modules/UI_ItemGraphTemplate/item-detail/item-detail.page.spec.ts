import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { TasksService } from 'src/app/services/task.service';
import Task from '../../../../../../common/src/models/task';
import { ItemDetailPageRoutingModule } from './item-detail-routing.module';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { ItemDetailPage } from './item-detail.page';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

describe('ItemDetailPage', () => {
  let component: ItemDetailPage;
  let fixture: ComponentFixture<ItemDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailPage],
      providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => "633da9d43585b5264761ab01" },
            }
          }
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
        TasksService,
        Location],
      imports: [IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        CustomComponentsModule,
        TranslateModule.forRoot(), 
        HttpClientModule, 
        ApolloModule, 
        RouterModule.forRoot([])  ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailPage);
    component = fixture.componentInstance;
    component.item = { name: "", priority: 2, status: "" } as Task;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
