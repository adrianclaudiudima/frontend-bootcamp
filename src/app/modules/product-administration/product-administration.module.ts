import {NgModule} from '@angular/core';
import {ProductAdministrationComponent} from './components/product-administration.component';
import {ProductListAdministrationComponent} from './components/product-list-administration/product-list-administration.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProductAdministrationRoutingModule} from './product-administration-routing.module';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductAdministrationService} from './services/product-administration.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {productAdministrationOrderReducer} from './store/product-administration.reducer';
import {ProductOrdersService} from './services/product-orders.service';
import {ProductAdministrationEffects} from './store/product-administration.effects';
import {EditOrderComponent} from './components/edit-order/edit-order.component';
import {PortalModule} from '@angular/cdk/portal';


@NgModule({
  declarations: [
    CreateProductComponent,
    ProductAdministrationComponent,
    ProductListAdministrationComponent,
    OrderListComponent,
    EditOrderComponent
  ],
  imports: [
    PortalModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('productAdministration', productAdministrationOrderReducer),
    EffectsModule.forFeature([ProductAdministrationEffects]),
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductAdministrationRoutingModule,
  ],
  providers: [
    ProductAdministrationService,
    ProductOrdersService
  ],
  exports: []
})
export class ProductAdministrationModule {

}
