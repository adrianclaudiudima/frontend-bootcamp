import {cartReducer, CartState} from './cart/cart.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  cartState: CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
  cartState: cartReducer
};
