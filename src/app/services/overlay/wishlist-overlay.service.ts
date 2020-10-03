import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { WishlistProductsDetailsComponent } from '../../components/overlay/wishlist-products-details/wishlist-products-details.component';
import { take } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class WishlistOverlayService {
  constructor(private overlayService: Overlay, private injector: Injector) {}

  showWishlistOverlay(element): void {
    // console.log(element);
    const overlayRef: OverlayRef = this.overlayService.create({
      width: '630px',
      height: '300px',
      maxHeight: '600px',
      disposeOnNavigation: true,
      hasBackdrop: true,
      positionStrategy: this.overlayService
        .position()
        .flexibleConnectedTo(element.elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'top',
            offsetY: 20,
            offsetX: 20,
            overlayX: 'end',
            overlayY: 'top',
          },
        ]),
      scrollStrategy: this.overlayService.scrollStrategies.block(),
    });

    const notificationSubject: Subject<any> = new ReplaySubject();
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(Subject, notificationSubject);
    const portalInjectionTokens = new PortalInjector(
      this.injector,
      injectionTokens
    );

    const componentPortal: ComponentPortal<WishlistProductsDetailsComponent> = new ComponentPortal<
      WishlistProductsDetailsComponent
    >(WishlistProductsDetailsComponent, null, portalInjectionTokens);

    notificationSubject
      .asObservable()
      .pipe(take(1))
      .subscribe((v) => {
        overlayRef.dispose();
      });
    componentPortal.attach(overlayRef);
  }
}
