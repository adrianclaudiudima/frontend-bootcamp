import {Action} from '@ngrx/store';
import {CartProduct} from '../../model/product';

export enum OrdersActionTypes {
  GET_ORDERS = '[Orders] Get all orders',
  GET_ORDERS_SUCCESS = '[Orders] Get all orders success',
  GET_ORDERS_FAILED = '[Orders] Get all orders failed',
}

export class GetOrdersAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS;

  constructor() {
  }
}

export class GetOrdersSuccessAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS_SUCCESS;

  constructor(public payload: Array<Array<CartProduct>>) {
  }
}

export class GetOrdersFailedAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS_FAILED;

  constructor(public payload: string) {
  }
}

export type OrdersActions = GetOrdersAction |
  GetOrdersSuccessAction |
  GetOrdersFailedAction;
