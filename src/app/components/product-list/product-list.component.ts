import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Subject, Subscription } from 'rxjs';
import { ProductsStateService } from '../../services/products-state.service';
import { DomainStatus, Status } from '../../modules/shared/models/DomainStatus';

import { WishlistStateService } from '../../services/wishlist-state.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  s = new Subject();
  showProductFavorite = false;
  requestStatuses: typeof Status = Status;
  domainStatusProducts: DomainStatus<Array<Product>>;
  productsFavorite: Array<Product> = [];
  hasError: boolean;
  subscriptions: Subscription[] = [];

  domainStatusWishlistProducts: DomainStatus<Array<Product>>;
  favoriteProducts: Array<Product> = [];
  wishlistProducts: Array<Product> = [];
  // favoriteSubscription: Subscription;

  constructor(
    private productServiceState: ProductsStateService,
    private wishlistServiceState: WishlistStateService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscriptions.push(
      this.productServiceState.productsDomainStatus$.subscribe(
        (productsDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusProducts = productsDomainStatus;
        }
      )
    );
    this.subscriptions.push(
      this.favoriteService.favoriteProducts$.subscribe(
        (products) => (this.favoriteProducts = products)
      )
    );

    this.subscriptions.push(
      this.wishlistServiceState.wishlistDomainStatus$.subscribe(
        (wishlistProductsDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusWishlistProducts = wishlistProductsDomainStatus;
        }
      )
    );
  }

  handleProductAddedToFavorite(product: Product): void {
    this.productsFavorite.push(product);
  }

  ngOnDestroy(): void {
    this.s.next();
    this.s.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
        (wishlistProductsDomainStatus: DomainStatus<Array<Product>>) => {
          this.domainStatusWishlistProducts = wishlistProductsDomainStatus;
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

    this.subscriptions.push(
      this.favoriteService.favoriteProducts$.subscribe(
        (products) => (this.favoriteProducts = products)
      )
    );
  }
}
