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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductAdministrationComponent,
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
    FavoriteService,
    CartService,
    {
      provide: ProductsService,
      useFactory: (httpClient: HttpClient, favoriteService: FavoriteService, cartService: CartService) => {
        return environment.production === true ? new ProductsServiceImpl(httpClient, favoriteService, cartService) :
          new ProductsServiceLogger(httpClient, favoriteService, cartService);
      },
      deps: [HttpClient, FavoriteService, CartService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
