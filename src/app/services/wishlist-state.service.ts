import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DomainStatus, Status } from '../modules/shared/models/DomainStatus';
import { Product } from '../model/product';

import { WishlistService } from './wishlist.service';
import { catchError, map, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { generateDomainStatus } from '../modules/shared/util/domain-status.mapper';
import { NotificationService } from './notification.service';

@Injectable()
export class WishlistStateService {
  private initialRequestStatus: DomainStatus<Array<Product>> = {
    domain: [],
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW,
    },
  };

  private wishlistProducts: Array<Product> = [];

  public wishlistDomainStatusSubject: Subject<
    DomainStatus<Array<Product>>
  > = new BehaviorSubject(this.initialRequestStatus);
  public wishlistDomainStatus$: Observable<
    DomainStatus<Array<Product>>
  > = this.wishlistDomainStatusSubject.asObservable();

  constructor(
    private wishlistService: WishlistService,
    private notificationService: NotificationService
  ) {}

  public nextRequest(nextValue: DomainStatus<Array<Product>>): void {
    if (nextValue.requestStatus.status === Status.FAILED) {
    }
    this.wishlistDomainStatusSubject.next(nextValue);
  }

  public loadWishlistProductsAndHandleResponse(): Observable<
    DomainStatus<Array<Product>>
  > {
    return this.wishlistService.loadProducts().pipe(
      take(1),
      tap((products) => {
        // console.log('wishlistProducts', this.wishlistProducts);

        this.wishlistProducts = products;
      }),
      map((products: Array<Product>) =>
        generateDomainStatus<Array<Product>>(Status.COMPLETED, products)
      ),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showGenericErrorSnackBar();
        return of(generateDomainStatus<Array<Product>>(Status.FAILED, error));
      }),
      tap((result) => {
        // console.log(' loadedProducts', result);
        this.wishlistDomainStatusSubject.next(result);
      })
    );
  }

  public addWishlistProductsAndHandleResponse(product: Product) {
    // console.log('add', product);
    return this.wishlistService.addProductToWishlist(product).pipe(
      take(1),
      map((product: Product) => {
        // console.log('add wishlistProducts', this.wishlistProducts);

        this.wishlistProducts.push(product);

        const products = generateDomainStatus<Array<Product>>(
          Status.COMPLETED,
          this.wishlistProducts
        );
        this.wishlistDomainStatusSubject.next(products);
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showGenericErrorSnackBar();
        return of(generateDomainStatus<Product>(Status.FAILED, error));
      })
    );
  }

  public removeWishlistProductsAndHandleResponse(id: number) {
    // console.log('remove', id);
    return this.wishlistService.removeProductFromWishlist(id).pipe(
      take(1),
      map((product: Product) => {
        // console.log('remove wishlistProducts', this.wishlistProducts);

        this.wishlistProducts = this.wishlistProducts.filter(
          (product) => product.id !== id
        );

        const products = generateDomainStatus<Array<Product>>(
          Status.COMPLETED,
          this.wishlistProducts
        );
        // console.log('remove Products', products);

        this.wishlistDomainStatusSubject.next(products);
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showGenericErrorSnackBar();
        return of(generateDomainStatus<Product>(Status.FAILED, error));
      })
    );
  }
}
