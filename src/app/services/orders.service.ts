import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../model/order';

@Injectable()
export class OrdersService {

  serviceHostUrl = environment.serviceHostUrl;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.serviceHostUrl + '/orders');
  }

  createOrder(orderedProducts: Order): Observable<Order> {
    return this.http.post<Order>(this.serviceHostUrl + '/orders', orderedProducts);
  }

}
