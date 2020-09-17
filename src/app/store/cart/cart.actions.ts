import {Action} from '@ngrx/store';
import {CartProduct, Product} from '../../model/product';

export enum CartProductsTypes {
  ADD_PRODUCT_TO_CART = '[Cart] Add Product to cart',
  UPDATE_PRODUCT_FROM_CART = '[Cart] Update Product from cart',
  REMOVE_PRODUCT_FROM_CART = '[Cart] Remove Product from cart'
}

export class AddProductToCartAction implements Action {
  readonly type = CartProductsTypes.ADD_PRODUCT_TO_CART;

  constructor(public payload: Product) {
  }
}

export class UpdateProductFromCartAction implements Action {
  readonly type = CartProductsTypes.UPDATE_PRODUCT_FROM_CART;


  constructor(public payload: CartProduct) {
  }
}

export class RemoveProductFromCartAction implements Action {
  readonly type = CartProductsTypes.REMOVE_PRODUCT_FROM_CART;


  constructor(public payload: number) {
  }
}

export type CartProductActions =
  AddProductToCartAction |
  UpdateProductFromCartAction |
  RemoveProductFromCartAction;
