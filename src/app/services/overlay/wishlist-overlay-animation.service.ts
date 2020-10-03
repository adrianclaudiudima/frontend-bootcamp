import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, Subject } from 'rxjs';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { WISHLIST_DISPOSE_NOTIFIER } from './wishlist-overlay.model';
import { WishlistAnimationDetailsComponent } from '../../components/overlay/wishlist-animation-details/wishlist-animation-details.component';
import { take } from 'rxjs/operators';

@Injectable()
export class WishlistOverlayAnimationService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  openWishlistOverlay(): void {
    const overlayRef: OverlayRef = this.overlay.create({
      height: '100vh',
      width: '100vw',
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
    });

    const notificationSubject: Subject<any> = new ReplaySubject(1);
    notificationSubject
      .asObservable()
      .pipe(take(1))
      .subscribe((value) => {
        overlayRef.dispose();
      });

    const portal = new ComponentPortal<WishlistAnimationDetailsComponent>(
      WishlistAnimationDetailsComponent,
      null,
      this.createWishlistInjector(overlayRef, notificationSubject)
    );
    portal.attach(overlayRef);
  }

  private createWishlistInjector(overlayRef, notificationSubject): Injector {
    const injectionTokens: WeakMap<any, any> = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(WISHLIST_DISPOSE_NOTIFIER, notificationSubject);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
