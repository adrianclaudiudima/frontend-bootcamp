import {NgModule} from '@angular/core';
import {ProductAdministrationComponent} from './components/product-administration.component';
import {ProductListAdministrationComponent} from './components/product-list-administration/product-list-administration.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProductAdministrationRoutingModule} from './product-administration-routing.module';


@NgModule({
  declarations: [
    ProductAdministrationComponent,
    ProductListAdministrationComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ProductAdministrationRoutingModule,
  ],
  exports: []
})
export class ProductAdministrationModule {

}
