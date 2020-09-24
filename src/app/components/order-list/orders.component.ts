import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable} from 'rxjs';
import {filter, mergeMap, take} from 'rxjs/operators';
import {Status} from '../../modules/shared/models/DomainStatus';
import {ProductItemType} from '../overlay/cart-details-overlay/cart-product-item/product-item-type.enum';
import * as fromOrders from './../../store/orders';
import {Order} from '../../model/order';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders$: Observable<Array<Order>>;
  public orderIds$: Observable<Array<number | string>>;
  public productItemType: typeof ProductItemType = ProductItemType;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new fromOrders.GetOrdersAction());
    this.orders$ = this.store.pipe(
      select(fromOrders.selectOrdersStateStatus),
      filter((status: Status) => status === Status.COMPLETED),
      take(1),
      mergeMap(() => this.store.pipe(
        select(fromOrders.selectAllOrders))
      )
    );
    this.orderIds$ = this.store.pipe(
      select(fromOrders.selectOrdersStateStatus),
      filter((status: Status) => status === Status.COMPLETED),
      take(1),
      mergeMap(() => this.store.pipe(
        select(fromOrders.selectAllOrdersIds))
      )
    );
  }

  public getNoOfProductsFromOrder(orderId: number): Observable<number> {
    return this.store.pipe(
      select(fromOrders.selectNoOfProductsFromOrder, orderId)
    );
  }

}
