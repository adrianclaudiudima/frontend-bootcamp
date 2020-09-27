import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../../model/order';

@Injectable()
export class ProductOrdersService {

  constructor(private httpClient: HttpClient) {
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`http://localhost:3000/orders/${order.id}`, order);
  }


  public loadOrders(): Observable<Array<Order>> {
    return this.httpClient.get<Array<Order>>(`http://localhost:3000/orders`);
  }

  public loadOrderById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`http://localhost:3000/orders/${orderId}`);
  }
}
