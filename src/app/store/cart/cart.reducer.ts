import {CartProduct} from '../../model/product';
import {CartProductActions, CartProductsTypes} from './cart.actions';
import {DomainStatus, Status} from '../../modules/shared/models/DomainStatus';

export interface CartState {
  products: Array<CartProduct>;
  order: DomainStatus<Array<CartProduct>>;
}

export const initialState: CartState = {
  products: [],
  order: {
    domain: [],
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW
    }
  }
};

export function cartReducer(state: CartState = initialState, action: CartProductActions): CartState {
  switch (action.type) {
    case CartProductsTypes.ADD_PRODUCT_TO_CART: {
      const productId: number = action.payload.id;
      let alteredProducts: Array<CartProduct> = [...state.products];
      const alreadyInCartProduct = alteredProducts.find(product => product.id === productId);
      if (alreadyInCartProduct) {
        alteredProducts = alteredProducts.map((product: CartProduct) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      } else {
        alteredProducts.push({ ...action.payload, quantity: 1 });
      }
      return { ...state, products: alteredProducts } as CartState;
    }

    case CartProductsTypes.UPDATE_PRODUCT_FROM_CART: {
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

    case CartProductsTypes.REMOVE_PRODUCT_FROM_CART:
      let alteredProducts: Array<CartProduct> = [...state.products];
      alteredProducts = alteredProducts.filter((product: CartProduct) => product.id !== action.payload);
      return { ...state, products: alteredProducts };

    case CartProductsTypes.REMOVE_ALL_PRODUCTS_FROM_CART: {
      return {
        ...state,
        products: []
      };
    }

    case CartProductsTypes.PLACE_ORDER_FROM_CART: {
      return {
        ...state,
        order: {
          domain: [],
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }

    case CartProductsTypes.PLACE_ORDER_FROM_CART_SUCCESS: {
      return {
        ...state,
        order: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }

    case CartProductsTypes.PLACE_ORDER_FROM_CART_FAILED: {
      return {
        ...state,
        order: {
          domain: [],
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }

    default:
      return { ...state };
  }
}
