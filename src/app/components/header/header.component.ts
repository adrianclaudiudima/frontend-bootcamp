import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Observable, Subscription } from 'rxjs';
import { MockAuthService } from '../../services/mock-auth.service';
import { Router } from '@angular/router';
import { FavoriteOverlayService } from '../../services/overlay/favorite-overlay.service';
import { CartOverlayService } from '../../services/overlay/cart-overlay.service';
import { AppState } from '../../store';
import { select, Store } from '@ngrx/store';
import * as fromCart from './../../store/cart';

import { catchError, map, take, tap } from 'rxjs/operators';
import { WishlistOverlayService } from '../../services/overlay/wishlist-overlay.service';
import { WishlistOverlayAnimationService } from '../../services/overlay/wishlist-overlay-animation.service';
import { WishlistStateService } from '../../services/wishlist-state.service';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  favoriteCount = 0;
  favoriteSubscription: Subscription;
  public cartCount$: Observable<number>;

  userLoggedIn: Observable<boolean>;

  wishlistCount = 0;
  wishlistSubscription: Subscription;

  constructor(
    private favoriteService: FavoriteService,
    private mockAuth: MockAuthService,
    private router: Router,
    private store: Store<AppState>,
    private favoriteOverlay: FavoriteOverlayService,
    private cartOverlayService: CartOverlayService,
    private wishlistOverlay: WishlistOverlayService,
    private wishlistOverlayAnimation: WishlistOverlayAnimationService,
    private wishlistServiceState: WishlistStateService
  ) {}

  ngOnInit(): void {
    this.favoriteSubscription = this.favoriteService.favoriteProducts$.subscribe(
      (favoriteProducts) => {
        this.favoriteCount = favoriteProducts.length;
      }
    );
    this.cartCount$ = this.store.pipe(
      select(fromCart.selectProductsTotalQuantity)
    );
    this.userLoggedIn = this.mockAuth.isUserLoggedIn$;

    this.loadWishlistProducts();

    this.wishlistSubscription = this.wishlistServiceState.wishlistDomainStatus$.subscribe(
      (wishlistDomainStatus) => {
        this.wishlistCount = wishlistDomainStatus.domain.length;
      }
    );
  }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
    this.wishlistSubscription.unsubscribe();
  }

  doLogin(): void {
    this.mockAuth.login('Test');
  }

  doLogout(): void {
    this.mockAuth.logout();
    this.router.navigate(['/']);
  }

  showFavoriteWidget(cdkOverlayOrigin): void {
    // console.log(cdkOverlayOrigin);
    this.favoriteOverlay.showFavoriteOverlay(cdkOverlayOrigin);
  }

  openCartOverlay(): void {
    this.cartOverlayService.openCartOverlay();
  }

  public loadWishlistProducts(): void {
    this.wishlistServiceState
      .loadWishlistProductsAndHandleResponse()
      .pipe(take(1))
      .subscribe((x) => {
        // this.wishlistCount = x.domain.length;
      });
  }

  showWishlistWidget(cdkOverlayOrigin): void {
    // console.log(cdkOverlayOrigin);
    this.wishlistOverlay.showWishlistOverlay(cdkOverlayOrigin);
  }

  openWishlistOverlay(): void {
    this.wishlistOverlayAnimation.openWishlistOverlay();
  }
}
