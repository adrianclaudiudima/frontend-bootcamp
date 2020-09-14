import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {ProductsService} from '../../services/products.service';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../model/product';
import {FavoriteService} from '../../services/favorite.service';


@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: [ 'product-details.component.scss' ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  isAtFavorite = false;
  isAtFavoriteSubscription: Subscription;
  product$: Observable<Product>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductsService,
              private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map<any, number>(paramMap => paramMap.get('id')),
      switchMap(productId => this.productService.loadProductById(productId)),
      tap(product => {
        this.isAtFavoriteSubscription = this.favoriteService.isProductAtFavorite(product.id)
          .subscribe(fav => this.isAtFavorite = fav);
      }),
      take(1)
    );


  }

  addProductToFavorite(product: Product): void {
    this.favoriteService.addProductToFavorite(product);
  }

  removeProductFromFavorite(productId): void {
    this.favoriteService.removeProductFromFavorite(productId);
  }

  ngOnDestroy(): void {
    this.isAtFavoriteSubscription.unsubscribe();
  }


}
