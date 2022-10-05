import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { GamesService } from 'src/app/services/games.service';
import Game from '../../../../../../common/src/models/game';
 
import { ItemNewFormPage } from './item-new-form.page';

describe('ItemNewFormPage', () => {
  let component: ItemNewFormPage;
  let fixture: ComponentFixture<ItemNewFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemNewFormPage ],
      imports: [IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        CustomComponentsModule,
        TranslateModule.forRoot(), 
        HttpClientModule, 
        RouterModule.forRoot([])  ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemNewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
