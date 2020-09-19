import { Action } from '@ngrx/store';
import { Product, CartProduct } from '../../model/product';

export enum CartProductTypes {
  ADD_PRODUCT_TO_CART = '[Cart] Add product to cart',
  UPDATE_PRODUCT_FROM_CART = '[Cart] Update product from cart',
  REMOVE_PRODUCT_FROM_CART = '[Cart] Remove product from cart'
}

export class AddProductToCartAction implements Action {
  readonly type = CartProductTypes.ADD_PRODUCT_TO_CART;

  constructor(public payload: Product) {

  }
}

export class UpdateProductFromCartAction implements Action {
  readonly type = CartProductTypes.UPDATE_PRODUCT_FROM_CART;

  constructor(public payload: CartProduct) {

  }
}

export class RemoveProductFromCartAction implements Action {
  readonly type = CartProductTypes.REMOVE_PRODUCT_FROM_CART;

  constructor(public payload: number) {

  }
}

export type CartProductActions =
  AddProductToCartAction |
  UpdateProductFromCartAction |
  RemoveProductFromCartAction;
