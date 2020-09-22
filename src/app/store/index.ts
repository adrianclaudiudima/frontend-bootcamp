import {cartReducer, CartState} from './cart/cart.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {ordersReducer, OrdersState} from './orders/orders.reducer';

export interface AppState {
  cartState: CartState;
  ordersState: OrdersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  cartState: cartReducer,
  ordersState: ordersReducer
};
