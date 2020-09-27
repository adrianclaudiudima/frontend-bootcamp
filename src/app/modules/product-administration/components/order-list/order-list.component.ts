import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ProductAdministrationState} from '../../store/product-administration.reducer';
import {LoadOrdersAction} from '../../store/product-administration.actions';
import {Order} from '../../../../model/order';
import {Observable} from 'rxjs';
import {getAllOrders} from '../../store/product-administration.selectors';
import {Router} from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: 'order-list.component.html',
  styleUrls: ['order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList$: Observable<Array<Order>>;

  constructor(private store: Store<ProductAdministrationState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadOrdersAction());
    this.orderList$ = this.store.pipe(
      select(getAllOrders)
    );
  }


  editOrder(orderId): void {
    this.router.navigate(['/product-administration/orders/' + orderId]);
  }

}
