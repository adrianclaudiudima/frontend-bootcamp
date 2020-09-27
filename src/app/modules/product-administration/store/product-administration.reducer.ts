import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Order} from '../../../model/order';
import {LoadOrdersActions, LoadOrdersActionType} from './product-administration.actions';
import {DomainStatus, RequestStatus, Status} from '../../shared/models/DomainStatus';


export const orderEntityAdapter = createEntityAdapter<Order>();
export const entityStateInitialState = orderEntityAdapter.getInitialState();
export const initialState: ProductAdministrationState = {
  ...entityStateInitialState,
  requestStatus: {
    errorMessage: undefined,
    status: Status.NEW
  },
  selectedOrder: {
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW
    },
    domain: undefined
  }
};

export interface ProductAdministrationState extends EntityState<Order> {
  requestStatus: RequestStatus;
  selectedOrder: DomainStatus<Order>;
}

export function productAdministrationOrderReducer(orderState: ProductAdministrationState = initialState, action: LoadOrdersActionType):
  ProductAdministrationState {
  switch (action.type) {
    case LoadOrdersActions.LOAD_ORDERS: {
      return {
        ...orderState,
        requestStatus: {
          status: Status.PENDING,
          errorMessage: undefined
        }
      };
    }

    case LoadOrdersActions.LOAD_ORDER_BY_ID: {
      return {
        ...orderState,
        selectedOrder: {
          domain: undefined,
          requestStatus: {
            status: Status.PENDING,
            errorMessage: undefined
          }
        }
      }
    }

    case LoadOrdersActions.LOAD_ORDERS_SUCCESS: {
      return {
        ...orderEntityAdapter.setAll(action.payload, orderState),
        requestStatus: {
          status: Status.COMPLETED,
          errorMessage: undefined
        }
      };

    }
    case LoadOrdersActions.LOAD_ORDER_BY_ID_FAILED: {
      return {
        ...orderState,
        selectedOrder: {
          domain: undefined,
          requestStatus: {
            errorMessage: 'something went wrong',
            status: Status.FAILED
          }
        }
      };
    }
    case LoadOrdersActions.LOAD_ORDERS_FAILED: {
      return {
        ...orderEntityAdapter.removeAll(orderState),
        requestStatus: {
          status: Status.FAILED,
          errorMessage: 'Something went wrong'
        }
      };
    }
    case LoadOrdersActions.LOAD_ORDER_BY_ID_SUCCESS: {
      return {
        ...orderState,
        selectedOrder: {
          domain: action.payload,
          requestStatus: {
            status: Status.COMPLETED,
            errorMessage: undefined
          }
        }
      };
    }
    case LoadOrdersActions.UPDATE_ORDER: {
      return {
        ...orderState,
        selectedOrder: {
          domain: undefined,
          requestStatus: {
            status: Status.PENDING,
            errorMessage: undefined
          }
        }
      };
    }
    case LoadOrdersActions.UPDATE_ORDER_SUCCESS: {
      return {
        ...orderState,
        selectedOrder: {
          domain: action.payload,
          requestStatus: {
            status: Status.COMPLETED,
            errorMessage: undefined
          }
        }
      };
    }

    case LoadOrdersActions.UPDATE_ORDER_FAILED: {
      return {
        ...orderState,
        selectedOrder: {
          ...orderState.selectedOrder,
          requestStatus: {
            status: Status.FAILED,
            errorMessage: action.payload
          }
        }
      };
    }

    default:
      return {...orderState};
  }

}



