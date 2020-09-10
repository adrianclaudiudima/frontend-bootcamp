import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFavoriteDetailsComponent} from './components/overlay/product-favorite-details/product-favorite-details.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductAdministrationGuard} from './components/product-administration/product-administration.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'favorites',
    component: ProductFavoriteDetailsComponent
  }, {
    path: 'product-administration',
    loadChildren: () => import('./modules/product-administration/product-administration.module').then(m => m.ProductAdministrationModule),
    canLoad: [ProductAdministrationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
