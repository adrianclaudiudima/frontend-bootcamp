import {Component, Inject, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, ReplaySubject} from 'rxjs';
import {CART_DISPOSE_NOTIFIER} from '../../../services/overlay/cart-overlay.model';
import {cartDetailsLeft, cartDetailsRight} from './cart-details-overlay.animation';
import {AnimationEvent} from '@angular/animations';
import {AppState} from '../../../store';
import {select, Store} from '@ngrx/store';
import {CartProduct} from '../../../model/product';

@Component({
  selector: 'app-cart-overlay',
  templateUrl: 'cart-details-overlay.component.html',
  styleUrls: ['cart-details-overlay.component.scss'],
  animations: [cartDetailsLeft, cartDetailsRight]
})
export class CartDetailsOverlayComponent implements OnInit {

  shown = true;
  cartProducts$: Observable<CartProduct[]>;

  constructor(private overlayRef: OverlayRef,
              private store: Store<AppState>,
              @Inject(CART_DISPOSE_NOTIFIER) private notificationSubject: ReplaySubject<any>) {
  }

  ngOnInit(): void {
    this.cartProducts$ = this.store.pipe(
      select((state: AppState) => state.cartState.products)
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
}


