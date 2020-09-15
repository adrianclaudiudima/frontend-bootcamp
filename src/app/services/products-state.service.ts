import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DomainStatus, Status} from '../modules/shared/models/DomainStatus';
import {Product} from '../model/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductsService} from './products.service';
import {catchError, map, take, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {generateDomainStatus} from '../modules/shared/util/domain-status.mapper';
import {NotificationService} from './notification.service';

@Injectable()
export class ProductsStateService {

  private initialRequestStatus: DomainStatus<Array<Product>> = {
    domain: [],
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW
    }
  };
  public productsDomainStatusSubject: Subject<DomainStatus<Array<Product>>> = new BehaviorSubject(this.initialRequestStatus);
  public productsDomainStatus$: Observable<DomainStatus<Array<Product>>> = this.productsDomainStatusSubject.asObservable();

  constructor(private productsService: ProductsService,
              private notificationService: NotificationService) {
  }

  public nextRequest(nextValue: DomainStatus<Array<Product>>): void {
    if (nextValue.requestStatus.status === Status.FAILED) {

    }
    this.productsDomainStatusSubject.next(nextValue);
  }

  public loadProductsAndHandleResponse(): Observable<DomainStatus<Array<Product>>> {
    return this.productsService.loadProducts()
      .pipe(
        take(1),
        map((products: Array<Product>) => generateDomainStatus<Array<Product>>(Status.COMPLETED, products)),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showGenericErrorSnackBar();
          return of(generateDomainStatus<Array<Product>>(Status.FAILED, error));
        }),
        tap((result) => this.productsDomainStatusSubject.next(result)),
      );
  }

}
