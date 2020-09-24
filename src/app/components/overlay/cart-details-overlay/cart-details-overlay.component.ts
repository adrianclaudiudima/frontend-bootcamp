import {Component, Inject, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, ReplaySubject} from 'rxjs';
import {CART_DISPOSE_NOTIFIER} from '../../../services/overlay/cart-overlay.model';
import {cartDetailsLeft, cartDetailsRight} from './cart-details-overlay.animation';
import {AnimationEvent} from '@angular/animations';
import {AppState} from '../../../store';
import {select, Store} from '@ngrx/store';
import {ProductWithQuantity} from '../../../model/product';
import {map} from 'rxjs/operators';
import {ProductItemType} from './cart-product-item/product-item-type.enum';
import {Router} from '@angular/router';
import * as fromCart from './../../../store/cart';

@Component({
  selector: 'app-cart-overlay',
  templateUrl: 'cart-details-overlay.component.html',
  styleUrls: ['cart-details-overlay.component.scss'],
  animations: [cartDetailsLeft, cartDetailsRight]
})
export class CartDetailsOverlayComponent implements OnInit {

  shown = true;
  cartProducts$: Observable<ProductWithQuantity[]>;
  cartTotalPrice$: Observable<number>;
  productItemType: typeof ProductItemType = ProductItemType;

  constructor(private overlayRef: OverlayRef,
              private store: Store<AppState>,
              private router: Router,
              @Inject(CART_DISPOSE_NOTIFIER) private notificationSubject: ReplaySubject<any>) {
  }

  ngOnInit(): void {
    this.cartProducts$ = this.store.pipe(
      select(fromCart.selectProducts)
    );
    this.cartTotalPrice$ = this.cartProducts$.pipe(
      map((cartProducts: Array<ProductWithQuantity>) => {
        return cartProducts.map(cartProduct => cartProduct.price * cartProduct.quantity)
          .reduce((v1, v2) => v1 + v2);
      })
    );
  }

  closeCartOverlay(): void {
    this.shown = false;
  }

  handleEvent(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.sendCloseNotification();
    }
  }

  private sendCloseNotification(): void {
    this.notificationSubject.next(true);
    this.notificationSubject.complete();
  }

  proceedToCheckout(): void {
    this.closeCartOverlay();
    this.router.navigate(['checkout']);
  }
}


