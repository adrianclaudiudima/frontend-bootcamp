import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFavoriteDetailsComponent} from './components/product-favorite-details/product-favorite-details.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductAdministrationComponent} from './components/product-administration/product-administration.component';
import {ProductAdministrationGuard} from './components/product-administration/product-administration.guard';
import {ProductAdministrationLeaveGuard} from './components/product-administration/product-administration-leave.guard';
import {ProductListAdministrationComponent} from './components/product-administration/product-list-administration/product-list-administration.component';
import {OrderListComponent} from './components/product-administration/order-list/order-list.component';

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
  },
  {
    path: 'product-administration',
    component: ProductAdministrationComponent,
    canActivate: [ProductAdministrationGuard],
    canDeactivate: [ProductAdministrationLeaveGuard],
    children: [
      {
        path: 'product-list',
        component: ProductListAdministrationComponent,
      }, {
        path: 'orders',
        component: OrderListComponent
      }, {
        path: '',
        component: ProductListAdministrationComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
