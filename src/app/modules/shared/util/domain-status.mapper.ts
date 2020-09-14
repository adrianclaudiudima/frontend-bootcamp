import {DomainStatus, Status} from '../models/DomainStatus';
import {HttpErrorResponse} from '@angular/common/http';

export function generateDomainStatus<T>(status: Status, T?, error?: HttpErrorResponse): DomainStatus<T> {
  return {
    domain: T ? T : undefined,
    requestStatus: {
      status,
      errorMessage: error ? error.message : undefined
    }
  };
}
