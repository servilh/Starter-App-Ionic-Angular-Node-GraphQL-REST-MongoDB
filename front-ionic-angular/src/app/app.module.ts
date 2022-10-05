import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DynamicItemDetailComponent } from './components/dynamic-item-detail/dynamic-item-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [AppComponent, DynamicItemDetailComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({ // <--- add this
      loader: { // <--- add this 
        provide: TranslateLoader, // <--- add this
        useFactory: (createTranslateLoader),  // <--- add this
        deps: [HttpClient] // <--- add this
      } // <--- add this
    }),
    ApolloModule
  ],
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
            //IF WE DON'T WANT CACHE
            // defaultOptions: {
            //   query: {
            //     fetchPolicy: 'no-cache',
            //   },
            //   watchQuery: {
            //     fetchPolicy: 'no-cache',
            //   },
            // },
          },
        };
      },
      deps: [HttpLink],
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}