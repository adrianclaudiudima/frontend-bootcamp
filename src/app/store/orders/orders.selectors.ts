import {AppState} from '../index';
import {createSelector} from '@ngrx/store';
import {ordersAdapter, OrdersState} from './orders.reducer';

export const selectOrdersState = (state: AppState) => state.ordersState;
export const selectOrdersStateStatus = createSelector(
  selectOrdersState,
  (ordersState: OrdersState) => ordersState.requestStatus.status
);
export const selectAllOrders = createSelector(
  selectOrdersState,
  ordersAdapter.getSelectors().selectAll
);
export const selectAllOrdersIds = createSelector(
  selectOrdersState,
  ordersAdapter.getSelectors().selectIds
);
