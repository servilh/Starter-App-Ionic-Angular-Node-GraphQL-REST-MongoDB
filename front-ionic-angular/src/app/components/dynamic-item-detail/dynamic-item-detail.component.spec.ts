import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import Task from '../../../../../common/src/models/task';

import { DynamicItemDetailComponent } from './dynamic-item-detail.component';

describe('DynamicItemDetailComponent', () => {
  let component: DynamicItemDetailComponent;
  let fixture: ComponentFixture<DynamicItemDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicItemDetailComponent ],
      imports: [IonicModule.forRoot(), CommonModule, TranslateModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicItemDetailComponent);
    component = fixture.componentInstance;
    component.item =  {
      name: 'name', priority: 2, status: 'cat'
    } as Task;
    component.readonly = false;
    component.itemType = 'Task';
    component.keysAlwaysReadOnly =[];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    // comp.OutPutEventEmitter.pipe(first()).subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
    // comp.click();
  });
});
