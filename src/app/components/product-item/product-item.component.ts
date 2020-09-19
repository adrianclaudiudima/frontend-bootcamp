import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {FavoriteService} from '../../services/favorite.service';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import { WishlistService } from '../../services/wishlist.service';
import {FavoriteOverlayService} from '../../services/overlay/favorite-overlay.service';
import { AppState } from '../../store/index';
import { AddProductToCartAction } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  isAtFavorite = false;
  isAtWishlist = false;
  isAtFavoriteSubscription: Subscription;
  isInWishlistSubscription: Subscription;
  product$: Observable<Product>;

  constructor(
    private favoriteService: FavoriteService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private proService: ProductsService,
    private favoriteOverlayService: FavoriteOverlayService,
    private store: Store<AppState>) {
  }

  @Input()
  product: Product;

  @Output()
  productAddedToFavorite: EventEmitter<Product> = new EventEmitter<Product>();
  productAddedToWishlist: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(productId => this.proService.loadProductById(Number(productId)))
    );

    this.isAtFavoriteSubscription = this.favoriteService.favoriteProducts$.pipe(
      map(allFavoriteProducts => {
        return !!allFavoriteProducts.find(pf => pf.id === this.product.id);
      })
    ).subscribe(
      v => {
        this.isAtFavorite = v;
      }
    );

    this.isInWishlistSubscription = this.wishlistService.wishlistProducts$.pipe(
      map(wishlistProducts => {
        return !!wishlistProducts.find(pf => pf.id === this.product.id);
      })
    ).subscribe(
      v => {
        this.isAtWishlist = v;
      }
    );
  }

  addProductToFavorite(): void {
    this.favoriteService.addProductToFavorite(this.product);
    this.productAddedToFavorite.emit(this.product);
  }

  removeProductFromFavorite(): void {
    this.favoriteService.removeProductFromFavorite(this.product.id);
  }

  addProductToWishlist() {
    this.wishlistService.addProduct(this.product);
    this.productAddedToWishlist.emit(this.product);
  }

  removeProductFromWishlist() {
    this.wishlistService.removeProduct(this.product.id);
  }

  ngOnDestroy(): void {
    this.isAtFavoriteSubscription.unsubscribe();
    this.isInWishlistSubscription.unsubscribe();
  }


  showFavoriteWidget(element) {
    this.favoriteOverlayService.showFavoriteOverlay(element);

  }

  addProductToCart() {
    this.store.dispatch(new AddProductToCartAction(this.product));
  }
}
