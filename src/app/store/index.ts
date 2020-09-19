import { ActionReducerMap } from '@ngrx/store';
import { CartState, cartReducer } from './cart/cart.reducer';

export interface AppState {
  cartState: CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
  cartState: cartReducer
}
