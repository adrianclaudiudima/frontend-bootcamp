import {Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ReplaySubject, Subject} from 'rxjs';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {CART_DISPOSE_NOTIFIER} from './cart-overlay.model';
import {CartDetailsOverlayComponent} from '../../components/overlay/cart-details-overlay/cart-details-overlay.component';
import {take} from 'rxjs/operators';


@Injectable()
export class CartOverlayService {


  constructor(private overlay: Overlay, private injector: Injector) {

  }


  openCartOverlay(): void {
    const overlayRef: OverlayRef = this.overlay.create({
      height: '100vh',
      width: '100vw',
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global()
    });

    const notificationSubject: Subject<any> = new ReplaySubject(1);
    notificationSubject.asObservable()
      .pipe(
        take(1)
      ).subscribe(value => {
      overlayRef.dispose();
    });

    const portal = new ComponentPortal<CartDetailsOverlayComponent>(
      CartDetailsOverlayComponent, null,
      this.createCartInjector(overlayRef, notificationSubject));
    portal.attach(overlayRef);
  }

  private createCartInjector(overlayRef, notificationSubject): Injector {
    const injectionTokens: WeakMap<any, any> = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(CART_DISPOSE_NOTIFIER, notificationSubject);
    return new PortalInjector(this.injector, injectionTokens);
  }

}
