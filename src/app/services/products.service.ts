import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {FavoriteService} from './favorite.service';
import {CartService} from './cart.service';

const serviceHostUrl = 'http://localhost:3000';

export abstract class ProductsService {
  public abstract loadProducts(): Observable<Array<Product>>;

  public abstract loadProductById(id: number): Observable<Product>;
}


@Injectable()
export class ProductsServiceImpl extends ProductsService {

  hostUrl = serviceHostUrl;

  constructor(private httpClient: HttpClient, private favoriteService: FavoriteService, private cartService: CartService) {
    super();
  }

  public loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`);
  }

  loadProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.hostUrl}/products/${id}`);
  }


}

@Injectable()
export class ProductsServiceLogger extends ProductsService {

  hostUrl = serviceHostUrl;
  selectedProduct: Product;

  constructor(private httpClient: HttpClient, private favoriteService: FavoriteService, private cartService: CartService) {
    super();
  }

  loadProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.hostUrl}/products/${id}`);
  }

  loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`).pipe(
      tap(response => {
        console.log('Products successfully called ');
        console.log(response);
      })
    );
  }

}




