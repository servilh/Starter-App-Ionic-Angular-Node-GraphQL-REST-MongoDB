import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { GamesService } from 'src/app/modules/UI_ItemRestTemplate/services/games.service';
import { HttpClientModule } from '@angular/common/http';

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
      GamesService],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), 
        HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
