import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class WishlistService {

  private wishlistProducts: Array<Product> = [];
  private wishlistSubject: Subject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  public wishlistProducts$ = this.wishlistSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  addProduct(product: Product): void {
    this.wishlistProducts.push(product);
    this.wishlistSubject.next(this.wishlistProducts);
  }

  removeProduct(id: number): void {
    this.wishlistProducts = this.wishlistProducts.filter(product => product.id !== id);
    this.wishlistSubject.next(this.wishlistProducts);
  }

  setProducts(products: Product[]): void {
    this.wishlistProducts = products;
    this.wishlistSubject.next(this.wishlistProducts);
  }

  isProductInWishlist(productId): Observable<boolean> {
    return this.wishlistProducts$.pipe(
      map(allProducts => {
        return !!allProducts.find(x => x.id === productId);
      })
    );
  }
}
