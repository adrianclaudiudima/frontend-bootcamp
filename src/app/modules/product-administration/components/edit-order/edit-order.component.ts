import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Order, OrderStatus} from '../../../../model/order';
import {select, Store} from '@ngrx/store';
import {ProductAdministrationState} from '../../store/product-administration.reducer';
import {getSelectedOrder} from '../../store/product-administration.selectors';
import {LoadOrderByIdAction, UpdateOrderAction} from '../../store/product-administration.actions';
import {Status} from '../../../shared/models/DomainStatus';

@Component({
  selector: 'app-edit-order',
  templateUrl: 'edit-order.component.html',
  styleUrls: ['edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order$: Observable<Order>;


  constructor(private activatedRoute: ActivatedRoute, private store: Store<ProductAdministrationState>) {

  }

  ngOnInit(): void {
    this.order$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      tap(v => this.store.dispatch(new LoadOrderByIdAction(Number(v)))),
      switchMap(() => this.store.pipe(select(getSelectedOrder))
        .pipe(
          filter(v => v.requestStatus.status !== Status.PENDING),
          map(orderState => orderState.domain)))
    );

  }


  acceptOrder(order: Order): void {
    this.store.dispatch(new UpdateOrderAction({...order, orderStatus: OrderStatus.COMPLETED}));
  }

  rejectOrder(order: Order): void {
    this.store.dispatch(new UpdateOrderAction({...order, orderStatus: OrderStatus.REJECTED}));
  }
}
