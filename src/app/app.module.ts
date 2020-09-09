import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './components/header/header.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ProductItemComponent} from './components/product-item/product-item.component';
import {ProductAdministrationComponent} from './components/product-administration/product-administration.component';
import {HoverDirective} from './directives/hover.directive';
import {ProductsService, ProductsServiceImpl, ProductsServiceLogger} from './services/products.service';
import {environment} from '../environments/environment';
import {FavoriteService} from './services/favorite.service';
import {CartService} from './services/cart.service';
import {ObservablesComponent} from './components/observables/observables.component';
import {ProductFavoriteDetailsComponent} from './components/product-favorite-details/product-favorite-details.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductAdministrationGuard} from './components/product-administration/product-administration.guard';
import {MockAuthService} from './services/mock-auth.service';
import {ProductAdministrationLeaveGuard} from './components/product-administration/product-administration-leave.guard';
import {ConfirmationDialogComponent} from './components/confirmation/confirmation-dialog.component';
import {ProductListAdministrationComponent} from './components/product-administration/product-list-administration/product-list-administration.component';
import {OrderListComponent} from './components/product-administration/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductAdministrationComponent,
    ObservablesComponent,
    ProductFavoriteDetailsComponent,
    ProductDetailsComponent,
    ProductListAdministrationComponent,
    OrderListComponent,
    ConfirmationDialogComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    MockAuthService,
    FavoriteService,
    CartService,
    {
      provide: ProductsService,
      useFactory: (httpClient: HttpClient, favoriteService: FavoriteService, cartService: CartService) => {
        return environment.production === true ? new ProductsServiceImpl(httpClient, favoriteService, cartService) :
          new ProductsServiceLogger(httpClient, favoriteService, cartService);
      },
      deps: [HttpClient, FavoriteService, CartService]
    },
    ProductAdministrationGuard,
    ProductAdministrationLeaveGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
