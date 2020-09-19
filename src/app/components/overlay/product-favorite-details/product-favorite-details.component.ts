import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../../services/favorite.service';
import {Product} from '../../../model/product';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {OverlayRef} from '@angular/cdk/overlay';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-favorite-details',
  templateUrl: 'product-favorite-details.component.html',
  styleUrls: ['product-favorite-details.component.scss']
})
export class ProductFavoriteDetailsComponent implements OnInit {

  product: Array<Product> = [];
  favoriteProducts$: Observable<Array<Product>>;

  constructor(
    private favoriteService: FavoriteService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private overlayRef: OverlayRef
  ) {}

  ngOnInit(): void {
    this.favoriteProducts$ = this.favoriteService.favoriteProducts$
      .pipe(
        tap(p => this.product = p)
      );
  }

  removeProduct(productToRemove: Product): void {
    this.favoriteService.removeProductFromFavorite(productToRemove.id);
  }

  moveToWishlist(product: Product) {
    this.wishlistService.addProduct(product);
    this.removeProduct(product);
  }

  removeAllExceptThis(item: Product): any {
    this.cartService.removeAllExcept(item.id);
  }

  closeOverlay(): void {
    this.overlayRef.dispose();
  }

}
