import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Product} from '../../../model/product';
import {Observable} from 'rxjs';


@Injectable()
export class ProductAdministrationService {

  private hostUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {

  }

  public createProduct(product: Product): Observable<Product> {
    const httpHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Product>(`${this.hostUrl}/products`, JSON.stringify(product), {
      headers: httpHeader
    });
  }

  public removeProduct(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.hostUrl}/products/${productId}`);
  }

  public getProductByProductName(productTitle: string): Observable<Array<Product>> {
    const httpParams: HttpParams = new HttpParams().append('title', productTitle);
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`, {
      params: httpParams
    });
  }

}
