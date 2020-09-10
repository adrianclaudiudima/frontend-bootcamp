import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {LoadingService} from '../loading.service';
import {Observable} from 'rxjs';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoadingOverlayComponent} from '../../components/overlay/loading-overlay/loading-overlay.component';

@Injectable()
export class LoadingOverlayService {

  overlayRef: OverlayRef;
  count$: Observable<number>;
  previousCount = 0;

  constructor(private overlay: Overlay, private loadingService: LoadingService) {
    this.count$ = this.loadingService.count$;
    this.subscribeToLoadingState();
  }

  subscribeToLoadingState(): void {
    this.count$.subscribe(v => {
      if (v > 0) {
        this.showOverlay();
      } else if (v === 0) {
        this.hideOverlay();
      }
      this.previousCount = v;
    });
  }

  showOverlay(): void {
    this.overlayRef = this.overlay.create({
      height: '100vh',
      width: '100vw',
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    const componentPortal: ComponentPortal<LoadingOverlayComponent> = new ComponentPortal<LoadingOverlayComponent>(LoadingOverlayComponent);
    const result = componentPortal.attach(this.overlayRef);
  }

  hideOverlay(): void {
    this.overlayRef.dispose();
  }


}
