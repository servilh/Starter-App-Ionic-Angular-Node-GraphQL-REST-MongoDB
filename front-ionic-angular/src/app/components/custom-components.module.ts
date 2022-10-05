import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicItemDetailComponent } from './dynamic-item-detail/dynamic-item-detail.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [DynamicItemDetailComponent],
  imports: [
    TranslateModule,
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [DynamicItemDetailComponent]
})
export class CustomComponentsModule { }
