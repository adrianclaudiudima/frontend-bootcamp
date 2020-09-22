import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CartProduct} from '../../model/product';
import {initialRequestStatus, RequestStatus, Status} from '../../modules/shared/models/DomainStatus';
import {OrdersActions, OrdersActionTypes} from './orders.actions';
import {EntityIdsUtil} from '../../util/entity-ids.util';


export const ordersAdapter: EntityAdapter<Array<CartProduct>> =
  createEntityAdapter<Array<CartProduct>>({
    selectId: () => EntityIdsUtil.getEntityId()
  });

export interface OrdersState extends EntityState<Array<CartProduct>> {
  requestStatus: RequestStatus;
}

export const ordersInitialState: OrdersState = ordersAdapter.getInitialState({
  requestStatus: initialRequestStatus
});

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
      const ordersState = {
        ...state,
        requestStatus: {
          errorMessage: undefined,
          status: Status.COMPLETED
        }
      };
      return ordersAdapter.addMany(action.payload, ordersState);
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
  }
}
