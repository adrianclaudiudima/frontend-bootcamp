import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsService, ProductsServiceImpl, ProductsServiceLogger } from './services/products.service';
import { FavoriteService } from './services/favorite.service';
import { CartService } from './services/cart.service';
import { ObservablesComponent } from './components/observables/observables.component';
import { ProductFavoriteDetailsComponent } from './components/overlay/product-favorite-details/product-favorite-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductAdministrationGuard } from './components/product-administration/product-administration.guard';
import { MockAuthService } from './services/mock-auth.service';
import { ProductAdministrationLeaveGuard } from './modules/product-administration/components/product-administration-leave.guard';
import { ConfirmationDialogComponent } from './components/confirmation/confirmation-dialog.component';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './services/loading.interceptor';
import { LoadingOverlayService } from './services/overlay/loading-overlay.service';
import { LoadingOverlayComponent } from './components/overlay/loading-overlay/loading-overlay.component';
import { FavoriteOverlayService } from './services/overlay/favorite-overlay.service';
import { SharedModule } from './modules/shared/shared.module';
import { CartDetailsOverlayComponent } from './components/overlay/cart-details-overlay/cart-details-overlay.component';
import { CartOverlayService } from './services/overlay/cart-overlay.service';
import { ProductsStateService } from './services/products-state.service';
import { NotificationService } from './services/notification.service';
import { environment } from '../environments/environment';
import { appReducers } from './store/index';
import { CartProductItemComponent } from './components/overlay/cart-product-item/cart-product-item.component';
import { WishlistService } from './services/wishlist.service';
import { ProductWishlistDetailsComponent } from './components/overlay/product-wishlist-details/product-wishlist-details.component';
import { WishlistOverlayService } from './services/overlay/wishlist-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ObservablesComponent,
    ProductFavoriteDetailsComponent,
    ProductDetailsComponent,
    ConfirmationDialogComponent,
    LoadingOverlayComponent,
    CartDetailsOverlayComponent,
    CartProductItemComponent,
    ProductWishlistDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    OverlayModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 30, logOnly: !environment.production})
  ],
  providers: [
    LoadingOverlayService,
    CartOverlayService,
    FavoriteOverlayService,
    WishlistOverlayService,
    ProductsStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    LoadingService,
    MockAuthService,
    NotificationService,
    FavoriteService,
    WishlistService,
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
