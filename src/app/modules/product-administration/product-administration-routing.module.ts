import {NgModule} from '@angular/core';
import {ProductAdministrationComponent} from './components/product-administration.component';
import {ProductAdministrationGuard} from '../../components/product-administration/product-administration.guard';
import {ProductAdministrationLeaveGuard} from './components/product-administration-leave.guard';
import {ProductListAdministrationComponent} from './components/product-list-administration/product-list-administration.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {RouterModule} from '@angular/router';
import {CreateProductComponent} from './components/create-product/create-product.component';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
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
          component: CreateProductComponent
        }
      ]
    }

  ])],
  exports: [RouterModule]
})
export class ProductAdministrationRoutingModule {

}
