import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import Game from '../../../../../common/src/models/game';

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
      name: 'name', price: 2, category: 'cat'
    } as Game;
    component.readonly = false;
    component.itemType = 'Game';
    component.keysAlwaysReadOnly =[];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    // comp.OutPutEventEmitter.pipe(first()).subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
    // comp.click();
  });
});
