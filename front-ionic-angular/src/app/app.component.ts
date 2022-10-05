import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'REST example', url: '/folder/rest', icon: 'mail' },
    { title: 'GRAPHQL example', url: '/graphql-folder/Graph', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
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
