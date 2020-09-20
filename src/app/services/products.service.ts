import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Product} from '../model/product';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {FavoriteService} from './favorite.service';
import {CartService} from './cart.service';
import {DomainStatus, Status} from '../modules/shared/models/DomainStatus';
import {environment} from '../../environments/environment';

const serviceHostUrl = environment.serviceHostUrl;

export abstract class ProductsService {
  public abstract loadProducts(): Observable<Array<Product>>;

  public abstract loadProductById(id: number): Observable<Product>;
}


@Injectable()
export class ProductsServiceImpl extends ProductsService {

  hostUrl = serviceHostUrl;

  constructor(private httpClient: HttpClient,
              private favoriteService: FavoriteService,
              private cartService: CartService) {
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

  public loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`);
  }

}




