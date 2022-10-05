import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'REST example', url: '/folder/REST', icon: 'mail' },
    { title: 'GRAPHQL example', url: '/graphql-folder/Graph', icon: 'paper-plane' }
  ];
  public labels = ['Label01', 'Label02', 'Label03', 'Label04', 'Label05', 'Label06'];
  public language:string = 'en';

  constructor(private translate: TranslateService) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.translate.setDefaultLang(this.language); 
  }
  languageChange(value) {  // add this 
    this.language = value;
    this.translate.use(this.language).subscribe(c=>{});  // add this
  }
}
