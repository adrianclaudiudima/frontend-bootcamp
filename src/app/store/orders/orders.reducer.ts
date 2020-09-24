import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductWithQuantity} from '../../model/product';
import {DomainStatus, initialRequestStatus, RequestStatus, Status} from '../../modules/shared/models/DomainStatus';
import {OrdersActions, OrdersActionTypes} from './orders.actions';
import {Order} from '../../model/order';


export const ordersAdapter: EntityAdapter<Order> =
  createEntityAdapter<Order>();

export const orderProductsAdapter: EntityAdapter<ProductWithQuantity> =
  createEntityAdapter<ProductWithQuantity>({
    selectId: (product: ProductWithQuantity) => product.orderId + ' ' + product.id
  });

export interface OrdersState {
  checkedOutOrder: DomainStatus<Order>,
  orders: EntityState<Order>,
  orderProducts: EntityState<ProductWithQuantity>,
  requestStatus: RequestStatus
}

export const ordersInitialState: OrdersState = {
  checkedOutOrder: {
    domain: undefined,
    requestStatus: initialRequestStatus
  },
  orders: ordersAdapter.getInitialState(),
  orderProducts: orderProductsAdapter.getInitialState(),
  requestStatus: initialRequestStatus
};

export function ordersReducer(state: OrdersState = ordersInitialState, action: OrdersActions): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.GET_ORDERS: {
      return {
        ...state,
        requestStatus: {
          errorMessage: undefined,
          status: Status.PENDING
        }
      };
    }

    case OrdersActionTypes.GET_ORDERS_SUCCESS: {
      let orderProducts: Array<ProductWithQuantity> = [];
      const orders: Array<Order> = action.payload.map(order => {
          orderProducts = orderProducts.concat(order.products.map((product: ProductWithQuantity) => {
            return {
              ...product,
              orderId: order.id
            };
          }) as Array<ProductWithQuantity>);
          return {
            ...order,
            products: order.products.map((product: ProductWithQuantity) => product.id)
          };
        }
      );
      return {
        ...state,
        requestStatus: {
          errorMessage: undefined,
          status: Status.COMPLETED
        },
        orders: ordersAdapter.addMany(orders, ordersAdapter.getInitialState()),
        orderProducts: orderProductsAdapter.addMany(orderProducts, orderProductsAdapter.getInitialState())
      };
    }

    case OrdersActionTypes.GET_ORDERS_FAILED: {
      return {
        ...state,
        requestStatus: {
          errorMessage: action.payload,
          status: Status.FAILED
        }
      };
    }

    case OrdersActionTypes.CREATE_CHECKOUT_ORDER: {
      return {
        ...state,
        checkedOutOrder: {
          domain: undefined,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }

    case OrdersActionTypes.CREATE_CHECKOUT_ORDER_SUCCESS: {
      return {
        ...state,
        checkedOutOrder: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }

    case OrdersActionTypes.CREATE_CHECKOUT_ORDER_FAILED: {
      return {
        ...state,
        checkedOutOrder: {
          domain: undefined,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
  }
}
