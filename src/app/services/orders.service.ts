import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CartProduct} from '../model/product';
import {Observable} from 'rxjs';

@Injectable()
export class OrdersService {

  serviceHostUrl = environment.serviceHostUrl;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Array<Array<CartProduct>>> {
    return this.http.get<Array<Array<CartProduct>>>(this.serviceHostUrl + '/orders');
  }

  createOrder(orderedProducts: Array<CartProduct>): Observable<Array<CartProduct>> {
    return this.http.post<Array<CartProduct>>(this.serviceHostUrl + '/orders', orderedProducts);
  }

}
