import {Injectable} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {CartService} from '../../services/cart.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CartProductsTypes,
  PlaceOrderFromCartAction,
  PlaceOrderFromCartFailedAction,
  PlaceOrderFromCartSuccessAction,
  RemoveAllProductsFromCartAction
} from './cart.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CartProduct} from '../../model/product';
import {of} from 'rxjs';
import {OrdersService} from '../../services/orders.service';

@Injectable()
export class CartEffects {

  constructor(private actions$: Actions,
              private ordersService: OrdersService,
              private notificationService: NotificationService) {
  }

  @Effect()
  placedOrder$ = this.actions$.pipe(
    ofType<PlaceOrderFromCartAction>(CartProductsTypes.PLACE_ORDER_FROM_CART),
    map((action: PlaceOrderFromCartAction) => action.payload),
    switchMap((orderedProducts: Array<CartProduct>) => this.ordersService.createOrder(orderedProducts).pipe(
      switchMap((orderedProductsResponse: Array<CartProduct>) => {
        this.notificationService.showCustomSnackBar('Your ordered was successfully submitted!')
        return [new PlaceOrderFromCartSuccessAction(orderedProductsResponse), new RemoveAllProductsFromCartAction()];
      }),
      catchError(error => {
        this.notificationService.showCustomSnackBar('Your ordered submission has failed!')
        return of(new PlaceOrderFromCartFailedAction(error.message))
      })
    ))
  );
}
