import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Product } from '../../../model/product';
import { Observable, Subject, ReplaySubject, Subscription } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';

import { WishlistStateService } from '../../../services/wishlist-state.service';
import { ProductsStateService } from '../../../services/products-state.service';

import {
  DomainStatus,
  Status,
} from '../../../modules/shared/models/DomainStatus';
import { OverlayRef } from '@angular/cdk/overlay';
import { WISHLIST_DISPOSE_NOTIFIER } from '../../../services/overlay/wishlist-overlay.model';
import {
  wishlistDetailsLeft,
  wishlistDetailsRight,
} from './wishlist-details-overlay.animation';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-wishlist-animation-details',
  templateUrl: './wishlist-animation-details.component.html',
  styleUrls: ['./wishlist-animation-details.component.scss'],
  animations: [wishlistDetailsLeft, wishlistDetailsRight],
})
export class WishlistAnimationDetailsComponent implements OnInit, OnDestroy {
  shown = true;
  s = new Subject();
  showProductFavorite = false;
  requestStatuses: typeof Status = Status;
  domainStatusProducts: DomainStatus<Array<Product>>;
  domainStatusWishlistProducts: DomainStatus<Array<Product>>;
  hasError: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private overlayRef: OverlayRef,
    @Inject(WISHLIST_DISPOSE_NOTIFIER)
    private notificationSubject: ReplaySubject<any>,
    private favoriteService: FavoriteService,
    private wishlistServiceState: WishlistStateService,
    private productServiceState: ProductsStateService
  ) {}

  closeWishlistOverlay(): void {
    this.shown = false;
  }

  handleEvent(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.sendCloseNotification();
    }
  }

  private sendCloseNotification(): void {
    this.notificationSubject.next(true);
    this.notificationSubject.complete();
  }

  ngOnInit(): void {
    this.loadWishlistProducts();

    this.subscriptions.push(
      this.wishlistServiceState.wishlistDomainStatus$.subscribe(
        (wishlistDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusWishlistProducts = wishlistDomainStatus;
        }
      )
    );
  }

  public loadProducts(): void {
    this.subscriptions.push(
      this.productServiceState.loadProductsAndHandleResponse().subscribe()
    );
  }

  public loadWishlistProducts(): void {
    this.subscriptions.push(
      this.wishlistServiceState
        .loadWishlistProductsAndHandleResponse()
        .subscribe()
    );
  }

  public loadAllProducts() {
    this.loadWishlistProducts();

    this.subscriptions.push(
      this.wishlistServiceState.wishlistDomainStatus$.subscribe(
        (wishlistDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusWishlistProducts = wishlistDomainStatus;
        }
      )
    );

    this.loadProducts();

    this.subscriptions.push(
      this.productServiceState.productsDomainStatus$.subscribe(
        (productsDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusProducts = productsDomainStatus;
        }
      )
    );
  }

  moveToFavorite(productToRemove: Product) {
    this.wishlistServiceState
      .removeWishlistProductsAndHandleResponse(productToRemove.id)
      .pipe(take(1))
      .subscribe((x: any) => {
        if (!x) {
          this.favoriteService.addProductToFavorite(productToRemove);
        }
        this.loadAllProducts();
      });
  }

  removeProduct(productToRemove: Product): void {
    this.wishlistServiceState
      .removeWishlistProductsAndHandleResponse(productToRemove.id)
      .pipe(take(1))
      .subscribe();
  }

  closeOverlay(): void {
    this.overlayRef.dispose();
  }

  ngOnDestroy(): void {
    this.s.next();
    this.s.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
