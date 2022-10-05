import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemNewFormPageRoutingModule } from './item-new-form-routing.module';

import { ItemNewFormPage } from './item-new-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemNewFormPageRoutingModule
  ],
  declarations: [ItemNewFormPage]
})
export class ItemNewFormPageModule {}
