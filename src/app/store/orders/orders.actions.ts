import {Action} from '@ngrx/store';
import {Order} from '../../model/order';

export enum OrdersActionTypes {
  GET_ORDERS = '[Orders] Get all orders',
  GET_ORDERS_SUCCESS = '[Orders] Get all orders success',
  GET_ORDERS_FAILED = '[Orders] Get all orders failed',
  CREATE_CHECKOUT_ORDER = '[Orders] Create checkout order',
  CREATE_CHECKOUT_ORDER_SUCCESS = '[Orders] Create checkout order success',
  CREATE_CHECKOUT_ORDER_FAILED = '[Orders] Create checkout order failed',
}

export class GetOrdersAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS;

  constructor() {
  }
}

export class GetOrdersSuccessAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS_SUCCESS;

  constructor(public payload: Array<Order>) {
  }
}

export class GetOrdersFailedAction implements Action {
  readonly type = OrdersActionTypes.GET_ORDERS_FAILED;

  constructor(public payload: string) {
  }
}

export class CreateCheckoutOrderAction implements Action {
  readonly type = OrdersActionTypes.CREATE_CHECKOUT_ORDER;

  constructor(public payload: Order) {
  }
}

export class CreateCheckoutOrderSuccessAction implements Action {
  readonly type = OrdersActionTypes.CREATE_CHECKOUT_ORDER_SUCCESS;

  constructor(public payload: Order) {
  }
}

export class CreateCheckoutOrderFailedAction implements Action {
  readonly type = OrdersActionTypes.CREATE_CHECKOUT_ORDER_FAILED;

  constructor(public payload: string) {
  }
}

export type OrdersActions = GetOrdersAction |
  GetOrdersSuccessAction |
  GetOrdersFailedAction |
  CreateCheckoutOrderAction |
  CreateCheckoutOrderSuccessAction |
  CreateCheckoutOrderFailedAction;
