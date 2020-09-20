import {Action} from '@ngrx/store';
import {CartProduct, Product} from '../../model/product';

export enum CartProductsTypes {
  ADD_PRODUCT_TO_CART = '[Cart] Add Product to cart',
  UPDATE_PRODUCT_FROM_CART = '[Cart] Update Product from cart',
  REMOVE_PRODUCT_FROM_CART = '[Cart] Remove Product from cart',
  REMOVE_ALL_PRODUCTS_FROM_CART = '[Cart] Remove all Products from cart',
  PLACE_ORDER_FROM_CART = '[Cart] Place Order from cart',
  PLACE_ORDER_FROM_CART_SUCCESS = '[Cart] Place Order from cart success',
  PLACE_ORDER_FROM_CART_FAILED = '[Cart] Place Order from cart failed'
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

export class RemoveAllProductsFromCartAction implements Action {
  readonly type = CartProductsTypes.REMOVE_ALL_PRODUCTS_FROM_CART;

  constructor() {
  }
}

export class PlaceOrderFromCartAction implements Action {
  readonly type = CartProductsTypes.PLACE_ORDER_FROM_CART;

  constructor(public payload: Array<CartProduct>) {
  }
}

export class PlaceOrderFromCartSuccessAction implements Action {
  readonly type = CartProductsTypes.PLACE_ORDER_FROM_CART_SUCCESS;

  constructor(public payload: Array<CartProduct>) {
  }
}

export class PlaceOrderFromCartFailedAction implements Action {
  readonly type = CartProductsTypes.PLACE_ORDER_FROM_CART_FAILED;

  constructor(public payload: string) {
  }
}

export type CartProductActions =
  AddProductToCartAction |
  UpdateProductFromCartAction |
  RemoveProductFromCartAction |
  RemoveAllProductsFromCartAction |
  PlaceOrderFromCartAction |
  PlaceOrderFromCartSuccessAction |
  PlaceOrderFromCartFailedAction;
