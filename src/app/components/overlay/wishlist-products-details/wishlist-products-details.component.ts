import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Product } from '../../../model/product';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { OverlayRef } from '@angular/cdk/overlay';

import { ProductsStateService } from '../../../services/products-state.service';
import { WishlistStateService } from '../../../services/wishlist-state.service';

import {
  DomainStatus,
  Status,
} from '../../../modules/shared/models/DomainStatus';

@Component({
  selector: 'app-wishlist-products-details',
  templateUrl: './wishlist-products-details.component.html',
  styleUrls: ['./wishlist-products-details.component.scss'],
})
export class WishlistProductsDetailsComponent implements OnInit, OnDestroy {
  s = new Subject();
  showProductFavorite = false;
  requestStatuses: typeof Status = Status;
  domainStatusProducts: DomainStatus<Array<Product>>;
  domainStatusWishlistProducts: DomainStatus<Array<Product>>;
  favoriteProducts: Array<Product> = [];

  // productsFavorite: Array<Product> = [];
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
