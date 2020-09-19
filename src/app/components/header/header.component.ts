import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {Observable, Subscription} from 'rxjs';
import {MockAuthService} from '../../services/mock-auth.service';
import { Router } from '@angular/router';
import { FavoriteOverlayService } from '../../services/overlay/favorite-overlay.service';
import { WishlistOverlayService } from '../../services/overlay/wishlist-overlay.service';
import {CartOverlayService} from '../../services/overlay/cart-overlay.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  favoriteCount = 0;
  wishlistCount = 0;

  favoriteSubscription: Subscription;
  wishlistSubscription: Subscription;

  userLoggedIn: Observable<boolean>;

  constructor(
    private favoriteService: FavoriteService,
    private wishlistService: WishlistService,
    private mockAuth: MockAuthService,
    private router: Router,
    private favoriteOverlay: FavoriteOverlayService,
    private wishlistOverlay: WishlistOverlayService,
    private cartOverlayService: CartOverlayService) {

  }

  ngOnInit(): void {
    this.favoriteSubscription = this.favoriteService.favoriteProducts$.subscribe(favoriteProducts => {
      this.favoriteCount = favoriteProducts.length;
    });
    this.wishlistSubscription = this.wishlistService.wishlistProducts$.subscribe(wishlistProducts => {
      this.wishlistCount = wishlistProducts.length;
    });
    this.userLoggedIn = this.mockAuth.isUserLoggedIn$;
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
    console.log(cdkOverlayOrigin);
    this.favoriteOverlay.showFavoriteOverlay(cdkOverlayOrigin);
  }

  showWishlistWidget(cdkOverlayOrigin) {
    this.wishlistOverlay.showWishlistOverlay(cdkOverlayOrigin);
  }

  openCartOverlay(): void {
    this.cartOverlayService.openCartOverlay();
  }


}
