export interface DomainStatus<T> {
  domain: T;
  requestStatus: RequestStatus;
}

export interface RequestStatus {
  errorMessage: string;
  status: Status;
}

export enum Status {
  NEW = 'NEW',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export const initialRequestStatus: RequestStatus = {
  errorMessage: undefined,
  status: Status.NEW
};
