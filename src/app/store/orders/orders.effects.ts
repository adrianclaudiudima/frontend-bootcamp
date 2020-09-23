import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../services/orders.service';
import {GetOrdersAction, GetOrdersFailedAction, GetOrdersSuccessAction, OrdersActionTypes} from './orders.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CartProduct} from '../../model/product';
import {NotificationService} from '../../services/notification.service';
import {of} from 'rxjs';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions,
              private ordersService: OrdersService,
              private notificationService: NotificationService) {
  }

  @Effect()
  getOrders$ = this.actions$.pipe(
    ofType<GetOrdersAction>(OrdersActionTypes.GET_ORDERS),
    switchMap(() => this.ordersService.getOrders().pipe(
      map((orders: Array<Array<CartProduct>>) => new GetOrdersSuccessAction(orders)),
      catchError(error => {
        this.notificationService.showCustomSnackBar('We couldn\'t get your orders!');
        return of(new GetOrdersFailedAction(error.message));
      })
    ))
  );
}
