export interface DomainStatus<T> {
  domain: T;
  requestStatus: {
    errorMessage: string,
    status: Status,
  };
}

export enum Status {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

