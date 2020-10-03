import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ProductItemComponent } from './components/product-item/product-item.component';
import {
  ProductsService,
  ProductsServiceImpl,
  ProductsServiceLogger,
} from './services/products.service';
import { environment } from '../environments/environment';
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
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingOverlayComponent } from './components/overlay/loading-overlay/loading-overlay.component';
import { FavoriteOverlayService } from './services/overlay/favorite-overlay.service';
import { SharedModule } from './modules/shared/shared.module';
import { CartDetailsOverlayComponent } from './components/overlay/cart-details-overlay/cart-details-overlay.component';
import { CartOverlayService } from './services/overlay/cart-overlay.service';
import { ProductsStateService } from './services/products-state.service';
import { NotificationService } from './services/notification.service';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CartProductItemComponent } from './components/overlay/cart-details-overlay/cart-product-item/cart-product-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { OrdersService } from './services/orders.service';
import { OrdersComponent } from './components/order-list/orders.component';
import { OrdersEffects } from './store/orders/orders.effects';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { WishlistProductsDetailsComponent } from './components/overlay/wishlist-products-details/wishlist-products-details.component';
import { WishlistAnimationDetailsComponent } from './components/overlay/wishlist-animation-details/wishlist-animation-details.component';
import { WishlistService } from './services/wishlist.service';
import { WishlistStateService } from './services/wishlist-state.service';
import { WishlistOverlayService } from './services/overlay/wishlist-overlay.service';
import { WishlistOverlayAnimationService } from './services/overlay/wishlist-overlay-animation.service';

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
    OrdersComponent,
    CheckoutComponent,
    WishlistProductsDetailsComponent,
    WishlistAnimationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    OverlayModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([OrdersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: !environment.production,
    }),
  ],
  providers: [
    LoadingOverlayService,
    CartOverlayService,
    FavoriteOverlayService,
    ProductsStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    LoadingService,
    MockAuthService,
    NotificationService,
    FavoriteService,
    CartService,
    OrdersService,
    {
      provide: ProductsService,
      useFactory: (
        httpClient: HttpClient,
        favoriteService: FavoriteService,
        cartService: CartService
      ) => {
        return environment.production === true
          ? new ProductsServiceImpl(httpClient, favoriteService, cartService)
          : new ProductsServiceLogger(httpClient, favoriteService, cartService);
      },
      deps: [HttpClient, FavoriteService, CartService],
    },
    ProductAdministrationGuard,
    ProductAdministrationLeaveGuard,
    WishlistService,
    WishlistStateService,
    WishlistOverlayService,
    WishlistOverlayAnimationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
