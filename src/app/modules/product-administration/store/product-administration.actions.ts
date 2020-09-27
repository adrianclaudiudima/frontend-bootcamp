import {Action} from '@ngrx/store';
import {Order} from '../../../model/order';

export enum LoadOrdersActions {
  LOAD_ORDERS = '[PRODUCT_ADMINISTRATION] Load orders',
  LOAD_ORDERS_SUCCESS = '[PRODUCT_ADMINISTRATION] Load orders success',
  LOAD_ORDERS_FAILED = '[PRODUCT_ADMINISTRATION] Load orders failed',
  LOAD_ORDER_BY_ID = '[PRODUCT_ADMINISTRATION] Load order',
  LOAD_ORDER_BY_ID_SUCCESS = '[PRODUCT_ADMINISTRATION] Load order success',
  LOAD_ORDER_BY_ID_FAILED = '[PRODUCT_ADMINISTRATION] Load order failed',
  UPDATE_ORDER = '[PRODUCT_ADMINISTRATION] Update order',
  UPDATE_ORDER_SUCCESS = '[PRODUCT_ADMINISTRATION] Update order success',
  UPDATE_ORDER_FAILED = '[PRODUCT_ADMINISTRATION] Update order failed',

}


export class LoadOrdersAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDERS;
}

export class LoadOrdersSuccessAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDERS_SUCCESS;

  constructor(public payload: Array<Order>) {
  }
}

export class LoadOrdersFailedAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDERS_FAILED;
}

export class LoadOrderByIdAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDER_BY_ID;

  constructor(public payload: number) {
  }
}

export class LoadOrderByIdSuccessAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDER_BY_ID_SUCCESS;

  constructor(public payload: Order) {
  }
}

export class LoadOrderByIdFailedAction implements Action {
  readonly type = LoadOrdersActions.LOAD_ORDER_BY_ID_FAILED;

  constructor() {
  }
}

export class UpdateOrderAction implements Action {
  readonly type = LoadOrdersActions.UPDATE_ORDER;

  constructor(public payload: Order) {
  }
}

export class UpdateOrderSuccessAction implements Action {
  readonly type = LoadOrdersActions.UPDATE_ORDER_SUCCESS;

  constructor(public payload: Order) {
  }
}

export class UpdateOrderFailedAction implements Action {
  readonly type = LoadOrdersActions.UPDATE_ORDER_FAILED;

  constructor(public payload: string) {
  }
}


export type LoadOrdersActionType = LoadOrdersAction | LoadOrdersFailedAction |
  LoadOrdersSuccessAction | LoadOrderByIdAction | LoadOrderByIdSuccessAction | LoadOrderByIdFailedAction |
  UpdateOrderFailedAction | UpdateOrderAction | UpdateOrderSuccessAction;
