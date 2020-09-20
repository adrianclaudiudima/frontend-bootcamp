export interface DomainStatus<T> {
  domain: T;
  requestStatus: {
    errorMessage: string,
    status: Status,
  };
}

export enum Status {
  NEW = 'NEW',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

