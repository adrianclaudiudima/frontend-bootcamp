import {AppState} from '../index';
import {createSelector} from '@ngrx/store';
import {orderProductsAdapter, ordersAdapter, OrdersState} from './orders.reducer';
import {Order} from '../../model/order';
import {ProductWithQuantity} from '../../model/product';

export const selectOrdersState = (state: AppState) => state.ordersState;
export const selectOrdersSubState = createSelector(
  selectOrdersState,
  s1 => s1.orders
);
export const selectOrderProductsSubState = createSelector(
  selectOrdersState,
  s1 => s1.orderProducts
);
export const selectOrdersStateStatus = createSelector(
  selectOrdersState,
  (ordersState: OrdersState) => ordersState.requestStatus.status
);
export const selectAllOrders = createSelector(
  selectOrdersSubState,
  ordersAdapter.getSelectors().selectAll
);
export const selectAllOrdersIds = createSelector(
  selectOrdersSubState,
  ordersAdapter.getSelectors().selectIds
);
export const selectAllOrderProducts = createSelector(
  selectOrderProductsSubState,
  orderProductsAdapter.getSelectors().selectAll
);
export const selectOrderById = createSelector(
  selectAllOrders,
  (orders: Order[], id: number) => orders[id]
);
export const selectNoOfProductsFromOrder = createSelector(
  selectAllOrderProducts,
  (orderProducts: ProductWithQuantity[], orderId: number) => {
    return orderProducts.filter((product: ProductWithQuantity) => product.orderId === orderId)
      .map((product: ProductWithQuantity) => product.quantity)
      .reduce((v1, v2) => v1 + v2);
  }
);
