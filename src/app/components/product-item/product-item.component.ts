import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../../model/product';
import { FavoriteService } from '../../services/favorite.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { AddProductToCartAction } from '../../store/cart';

import { WishlistStateService } from '../../services/wishlist-state.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  isAtFavorite = false;
  isAtFavoriteSubscription: Subscription;
  product$: Observable<Product>;

  isAtWishlist = false;
  isAtWishlistSubscription: Subscription;

  constructor(
    private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,
    private proService: ProductsService,
    private store: Store<AppState>,
    private wishlistServiceState: WishlistStateService,
    private notificationService: NotificationService
  ) {}

  @Input()
  product: Product;

  @Input()
  favoriteProducts: Product[];

  @Input()
  wishlistProducts: Product[];

  @Output()
  productAddedToFavorite: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  productAddedToWishlist: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((productId) =>
        this.proService.loadProductById(Number(productId))
      )
    );

    this.isAtFavoriteSubscription = this.favoriteService.favoriteProducts$
      .pipe(
        map((allFavoriteProducts) => {
          return !!allFavoriteProducts.find((pf) => pf.id === this.product.id);
        })
      )
      .subscribe((v) => {
        this.isAtFavorite = v;
      });

    this.isAtWishlistSubscription = this.wishlistServiceState.wishlistDomainStatus$
      .pipe(
        map((allWishlistProducts) => {
          return !!allWishlistProducts.domain.find(
            (wp) => wp.id === this.product.id
          );
        })
      )
      .subscribe((res) => {
        this.isAtWishlist = res;
      });
  }

  addProductToFavorite(): void {
    //verify if the product is in the Wishlist list

    const existingProduct = this.wishlistProducts.find(
      (product) => product.id === this.product.id
    );

    if (existingProduct) {
      this.notificationService.showErrorSnackBar(
        "'Acest produs exista deja in Wishlist List si nu poate face parte simultan din Favorite!'"
      );
    } else {
      this.favoriteService.addProductToFavorite(this.product);
    }
  }

  removeProductFromFavorite(): void {
    this.favoriteService.removeProductFromFavorite(this.product.id);
  }

  addProductToWishlist() {
    //verify if the product is in the Favorites list

    const existingProduct = this.favoriteProducts.find(
      (product) => product.id === this.product.id
    );

    if (existingProduct) {
      this.notificationService.showErrorSnackBar(
        "'Acest produs exista deja in Favorite si nu poate face parte simultan din Wishlist!!'"
      );
    } else {
      this.wishlistServiceState
        .addWishlistProductsAndHandleResponse(this.product)
        .pipe(take(1))
        .subscribe();
    }
  }

  removeProductFromWishlist(): void {
    this.wishlistServiceState
      .removeWishlistProductsAndHandleResponse(this.product.id)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.isAtFavoriteSubscription.unsubscribe();
  }

  addProductToCart(): void {
    this.store.dispatch(new AddProductToCartAction(this.product));
  }
}
