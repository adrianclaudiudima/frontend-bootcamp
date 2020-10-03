import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Product } from '../../../model/product';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { WishlistStateService } from '../../../services/wishlist-state.service';
import { ProductsStateService } from '../../../services/products-state.service';

import {
  DomainStatus,
  Status,
} from '../../../modules/shared/models/DomainStatus';

@Component({
  selector: 'app-favorite-details',
  templateUrl: 'product-favorite-details.component.html',
  styleUrls: ['product-favorite-details.component.scss'],
})
export class ProductFavoriteDetailsComponent implements OnInit, OnDestroy {
  favoriteProducts: Array<Product> = [];
  favoriteProducts$: Observable<Array<Product>>;
  s = new Subject();
  showProductFavorite = false;
  requestStatuses: typeof Status = Status;
  domainStatusWishlistProducts: DomainStatus<Array<Product>>;
  domainStatusProducts: DomainStatus<Array<Product>>;

  productsFavorite: Array<Product> = [];
  hasError: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private overlayRef: OverlayRef,
    private wishlistServiceState: WishlistStateService,
    private productServiceState: ProductsStateService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.wishlistServiceState.wishlistDomainStatus$.subscribe(
        (wishlistDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusWishlistProducts = wishlistDomainStatus;
        }
      )
    );

    this.favoriteProducts$ = this.favoriteService.favoriteProducts$.pipe(
      tap((p) => (this.favoriteProducts = p))
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

  moveToWishlist(productToRemove: Product): void {
    this.loadWishlistProducts();

    this.wishlistServiceState
      .addWishlistProductsAndHandleResponse(productToRemove)
      .pipe(take(1))
      .subscribe((x) => {
        if (!x) {
          this.favoriteService.removeProductFromFavorite(productToRemove.id);
        }
      });
  }

  removeProduct(productToRemove: Product): void {
    this.favoriteService.removeProductFromFavorite(productToRemove.id);
  }

  removeAllExceptThis(item: Product): any {
    this.cartService.removeAllExcept(item.id);
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
