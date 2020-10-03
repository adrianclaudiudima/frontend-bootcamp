import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FavoriteService {
  private favoriteProducts: Array<Product> = [];
  private favoriteSubject: Subject<Array<Product>> = new BehaviorSubject<
    Array<Product>
  >([]);
  public favoriteProducts$ = this.favoriteSubject.asObservable();

  constructor() {}

  addProductToFavorite(product: Product): void {
    this.favoriteProducts.push(product);
    this.favoriteSubject.next(this.favoriteProducts);
  }

  public getSomething(): number {
    return 42;
  }

  removeProductFromFavorite(id: number): void {
    this.favoriteProducts = this.favoriteProducts.filter(
      (product) => product.id !== id
    );
    this.favoriteSubject.next(this.favoriteProducts);
  }

  setProducts(products: Product[]): void {
    this.favoriteProducts = products;
    this.favoriteSubject.next(this.favoriteProducts);
  }

  isProductAtFavorite(productId): Observable<boolean> {
    return this.favoriteProducts$.pipe(
      map((allFavoriteProducts) => {
        return !!allFavoriteProducts.find((pf) => pf.id === productId);
      })
    );
  }
}
