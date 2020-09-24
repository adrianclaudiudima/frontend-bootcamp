import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../services/orders.service';
import {
  CreateCheckoutOrderAction,
  CreateCheckoutOrderSuccessAction,
  GetOrdersAction,
  GetOrdersFailedAction,
  GetOrdersSuccessAction,
  OrdersActionTypes
} from './orders.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {NotificationService} from '../../services/notification.service';
import {of} from 'rxjs';
import {Order} from '../../model/order';
import {Router} from '@angular/router';
import * as fromCart from './../cart';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions,
              private ordersService: OrdersService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  @Effect()
  getOrders$ = this.actions$.pipe(
    ofType<GetOrdersAction>(OrdersActionTypes.GET_ORDERS),
    switchMap(() => this.ordersService.getOrders().pipe(
      map((orders: Array<Order>) => new GetOrdersSuccessAction(orders)),
      catchError(error => {
        this.notificationService.showCustomSnackBar('We couldn\'t get your orders!');
        return of(new GetOrdersFailedAction(error.message));
      })
    ))
  );

  @Effect()
  placedOrder$ = this.actions$.pipe(
    ofType<CreateCheckoutOrderAction>(OrdersActionTypes.CREATE_CHECKOUT_ORDER),
    map((action: CreateCheckoutOrderAction) => action.payload),
    switchMap((order: Order) => this.ordersService.createOrder(order).pipe(
      switchMap((orderedProductResponse: Order) => {
        this.notificationService.showCustomSnackBar('Your order was submitted successfully!');
        this.router.navigate(['']);
        return [new CreateCheckoutOrderSuccessAction(orderedProductResponse),
          new fromCart.RemoveAllProductsFromCartAction()];
      })
    ))
  );
}
