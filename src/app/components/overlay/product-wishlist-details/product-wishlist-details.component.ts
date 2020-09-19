import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { Product } from '../../../model/product';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-product-wishlist-details',
  templateUrl: './product-wishlist-details.component.html',
  styleUrls: ['./product-wishlist-details.component.scss']
})
export class ProductWishlistDetailsComponent implements OnInit {

  product: Array<Product> = [];
  wishlistProducts$: Observable<Array<Product>>;

  constructor(
    private wishlistService: WishlistService,
    private favoritesService: FavoriteService,
    private cartService: CartService,
    private overlayRef: OverlayRef
  ) { }

  ngOnInit(): void {
    this.wishlistProducts$ = this.wishlistService.wishlistProducts$
      .pipe(
        tap(p => this.product = p)
      );
  }

  removeProduct(productToRemove: Product): void {
    this.wishlistService.removeProduct(productToRemove.id);
  }

  moveToFavorites(product: Product) {
    this.favoritesService.addProductToFavorite(product);
    this.removeProduct(product);
  }

  closeOverlay(): void {
    this.overlayRef.dispose();
  }
}
