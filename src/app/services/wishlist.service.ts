import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

const serviceHostUrl = 'http://localhost:3000';

@Injectable()
export class WishlistService {
  hostUrl = serviceHostUrl;

  constructor(private httpClient: HttpClient) {}

  loadProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.hostUrl}/wishlist/${id}`);
  }

  public loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/wishlist`);
  }

  public addProductToWishlist(product: Product): Observable<Product> {
    // console.log('addProduct', product);

    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<Product>(
      `${this.hostUrl}/wishlist`,
      JSON.stringify(product),
      {
        headers: httpHeader,
      }
    );
  }

  public removeProductFromWishlist(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.hostUrl}/wishlist/${productId}`);
  }
}
