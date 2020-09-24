import {Action} from '@ngrx/store';
import {Product, ProductWithQuantity} from '../../model/product';

export enum CartProductsTypes {
  ADD_PRODUCT_TO_CART = '[Cart] Add Product to cart',
  UPDATE_PRODUCT_FROM_CART = '[Cart] Update Product from cart',
  REMOVE_PRODUCT_FROM_CART = '[Cart] Remove Product from cart',
  REMOVE_ALL_PRODUCTS_FROM_CART = '[Cart] Remove all Products from cart'
}

export class AddProductToCartAction implements Action {
  readonly type = CartProductsTypes.ADD_PRODUCT_TO_CART;

  constructor(public payload: Product) {
  }
}

export class UpdateProductFromCartAction implements Action {
  readonly type = CartProductsTypes.UPDATE_PRODUCT_FROM_CART;

  constructor(public payload: ProductWithQuantity) {
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

export type CartProductActions =
  AddProductToCartAction |
  UpdateProductFromCartAction |
  RemoveProductFromCartAction |
  RemoveAllProductsFromCartAction;
