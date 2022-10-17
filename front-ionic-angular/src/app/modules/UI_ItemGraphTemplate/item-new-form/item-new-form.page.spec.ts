import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

import { ItemNewFormPage } from './item-new-form.page';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

describe('ItemNewFormPage', () => {
  let component: ItemNewFormPage;
  let fixture: ComponentFixture<ItemNewFormPage>;

  beforeEach(waitForAsync(() => {
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
      declarations: [ItemNewFormPage],
      imports: [IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ApolloModule,
        CustomComponentsModule,
      TranslateModule.forRoot(),
        HttpClientModule,
      RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemNewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
