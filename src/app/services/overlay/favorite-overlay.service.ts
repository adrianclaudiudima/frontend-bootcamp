import {Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ProductFavoriteDetailsComponent} from '../../components/overlay/product-favorite-details/product-favorite-details.component';
import {take} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class FavoriteOverlayService {


  constructor(private overlayService: Overlay, private injector: Injector) {
  }


  showFavoriteOverlay(element): void {
    console.log(element);
    const overlayRef: OverlayRef = this.overlayService.create({
      width: '600px',
      height: '300px',
      maxHeight: '600px',
      disposeOnNavigation: true,
      hasBackdrop: true,
      positionStrategy: this.overlayService.position()
        .flexibleConnectedTo(element.elementRef)
        .withPositions([{
          originX: 'start',
          originY: 'top',
          offsetY: 20,
          offsetX: 20,
          overlayX: 'end',
          overlayY: 'top'
        }]),
      scrollStrategy: this.overlayService.scrollStrategies.block()
    });


    const notificationSubject: Subject<any> = new ReplaySubject();
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(Subject, notificationSubject);
    const portalInjectionTokens = new PortalInjector(this.injector, injectionTokens);

    const componentPortal: ComponentPortal<ProductFavoriteDetailsComponent> =
      new ComponentPortal<ProductFavoriteDetailsComponent>(ProductFavoriteDetailsComponent, null, portalInjectionTokens);

    notificationSubject.asObservable().pipe(
      take(1)
    ).subscribe(v => {
      overlayRef.dispose();
    });
    componentPortal.attach(overlayRef);


  }


}
