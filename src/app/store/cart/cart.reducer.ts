import { CartProduct } from '../../model/product';
import { CartProductActions, CartProductTypes } from './cart.actions';

export interface CartState {
  products: Array<CartProduct> 
}

export const initialState: CartState = {
  products: []
};

export function cartReducer(state: CartState = initialState, action: CartProductActions): CartState {
  switch (action.type) {
    case CartProductTypes.ADD_PRODUCT_TO_CART: {
      const productId: number = action.payload.id;
      let alteredProducts: Array<CartProduct> = [...state.products];
      const alreadyInCartProduct = alteredProducts.find(x => x.id === productId);
      if (alreadyInCartProduct) {
        alteredProducts = alteredProducts.map((product: CartProduct) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        })
      } else {
        alteredProducts.push({ ...action.payload, quantity: 1 });
      }

      return { ...state, products: alteredProducts };
    }
    case CartProductTypes.UPDATE_PRODUCT_FROM_CART: {
      const productId: number = action.payload.id;
      let alteredProducts: Array<CartProduct> = [...state.products];
      alteredProducts = alteredProducts.map((product: CartProduct) => {
        if (product.id === productId) {
          return action.payload;
        } else {
          return product;
        }
      });

      return { ...state, products: alteredProducts };
    }
    case CartProductTypes.REMOVE_PRODUCT_FROM_CART: {
      let alteredProducts: Array<CartProduct> = [...state.products];
      alteredProducts = alteredProducts.filter(x => x.id !== action.payload);

      return { ...state, products: alteredProducts };
    }
    default: {
      return { ...state };
    }
  }
}
