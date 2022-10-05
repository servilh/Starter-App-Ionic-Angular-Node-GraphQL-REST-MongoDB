import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'graphql-folder/graph',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./modules/UI_ItemRestTemplate/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'item-new-form',
    loadChildren: () => import('./modules/UI_ItemRestTemplate/item-new-form/item-new-form.module').then( m => m.ItemNewFormPageModule)
  },
  {
    path: 'item-detail/:id',
    loadChildren: () => import('./modules/UI_ItemRestTemplate/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'graphql-folder/:id',
    loadChildren: () => import('./modules/UI_ItemGraphTemplate/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'graphql-item-new-form',
    loadChildren: () => import('./modules/UI_ItemGraphTemplate/item-new-form/item-new-form.module').then( m => m.ItemNewFormPageModule)
  },
  {
    path: 'graphql-item-detail/:id',
    loadChildren: () => import('./modules/UI_ItemGraphTemplate/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
