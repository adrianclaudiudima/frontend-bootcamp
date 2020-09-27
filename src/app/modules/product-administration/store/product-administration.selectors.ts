import {createFeatureSelector, createSelector} from '@ngrx/store';
import {orderEntityAdapter, ProductAdministrationState} from './product-administration.reducer';

export const productAdministrationSelector = createFeatureSelector<ProductAdministrationState>('productAdministration');
export const getAllOrders = createSelector(productAdministrationSelector, orderEntityAdapter.getSelectors().selectAll);
export const getSelectedOrder = createSelector(productAdministrationSelector, s1 => s1.selectedOrder);
export const getOrdersRequestStatus = createSelector(productAdministrationSelector, s1 => s1.requestStatus);
export const getOrderById = createSelector(productAdministrationSelector, (productAdministrationState, orderId) => {
  return productAdministrationState.entities[orderId];
});
