import {AppState} from '../index';
import {createSelector} from '@ngrx/store';
import {ProductWithQuantity} from '../../model/product';

export const selectCartState = (state: AppState) => state.cartState;
export const selectProducts = createSelector(selectCartState, (state) => state.products);
export const selectProductsTotalQuantity = createSelector(
  selectProducts,
  (products: Array<ProductWithQuantity>) => {
    if (products.length > 0) {
      return products.map((product: ProductWithQuantity) => product.quantity)
        .reduce((v1, v2) => v1 + v2);
    } else {
      return undefined;
    }
  }
);
