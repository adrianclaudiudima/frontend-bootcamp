import {Injectable} from '@angular/core';
import {ProductOrdersService} from '../services/product-orders.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  LoadOrderByIdAction,
  LoadOrderByIdFailedAction,
  LoadOrderByIdSuccessAction,
  LoadOrdersAction,
  LoadOrdersActions,
  LoadOrdersFailedAction,
  LoadOrdersSuccessAction,
  UpdateOrderAction,
  UpdateOrderFailedAction,
  UpdateOrderSuccessAction
} from './product-administration.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getOrderById} from './product-administration.selectors';


@Injectable()
export class ProductAdministrationEffects {

  constructor(private productOrdersService: ProductOrdersService, private actions: Actions, private store: Store<any>) {
  }

  @Effect()
  loadOrders$ = this.actions.pipe(
    ofType<LoadOrdersAction>(LoadOrdersActions.LOAD_ORDERS),
    switchMap(action => {
      return this.productOrdersService.loadOrders().pipe(
        map(response => new LoadOrdersSuccessAction(response))
      );
    }),
    catchError(error => of(new LoadOrdersFailedAction()))
  );

  @Effect()
  loadOrderById$ = this.actions.pipe(
    ofType<LoadOrderByIdAction>(LoadOrdersActions.LOAD_ORDER_BY_ID),
    switchMap(action => {
      return this.productOrdersService.loadOrderById(action.payload).pipe(
        map(order => new LoadOrderByIdSuccessAction(order))
      );
    }),
    catchError(err => {
      return of(new LoadOrderByIdFailedAction());
    })
  );

  @Effect()
  updatedOrder$ = this.actions.pipe(
    ofType<UpdateOrderAction>(LoadOrdersActions.UPDATE_ORDER),
    tap(v => console.log(v)),
    withLatestFrom(this.store.pipe(select(getOrderById))),
    switchMap(action => {
      console.log(action);
      console.log('action');
      return this.productOrdersService.updateOrder(action[0].payload).pipe(
        map(response => new UpdateOrderSuccessAction(response))
      );
    }),
    catchError(error => {
      return of(new UpdateOrderFailedAction('Something went wrong'));
    })
  );


}
