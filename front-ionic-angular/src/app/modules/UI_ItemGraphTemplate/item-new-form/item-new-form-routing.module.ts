import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemNewFormPage } from './item-new-form.page';

const routes: Routes = [
  {
    path: '',
    component: ItemNewFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemNewFormPageRoutingModule {}
