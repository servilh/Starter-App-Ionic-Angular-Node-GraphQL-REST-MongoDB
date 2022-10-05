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

import { ItemDetailPage } from './item-detail.page';

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
              paramMap: { get: () => "62a74144f8fd7ef778a541e1" },
            }
          }
        },
        TasksService,
        Location],
      imports: [IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        CustomComponentsModule,
        TranslateModule.forRoot(), 
        HttpClientModule, 
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
