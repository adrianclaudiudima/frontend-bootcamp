import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {Product} from '../../model/product';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-favorite-details',
  templateUrl: 'product-favorite-details.component.html',
  styleUrls: ['product-favorite-details.component.scss']
})
export class ProductFavoriteDetailsComponent implements OnInit {

  product: Array<Product> = [];
  favoriteProducts$: Observable<Array<Product>>;

  constructor(private favoriteService: FavoriteService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.favoriteProducts$ = this.favoriteService.favoriteProducts$
      .pipe(
        tap(p => this.product = p),
        tap(v => console.log('=----HIT HIT HIT----='))
      );
  }

  removeProduct(productToRemove: Product): void {
    this.favoriteService.removeProductFromFavorite(productToRemove.id);
  }

  removeAllExceptThis(item: Product): any {
    this.cartService.removeAllExcept(item.id);
  }
}
