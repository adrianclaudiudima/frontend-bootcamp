import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {ProductAdministrationComponent} from './product-administration.component';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation/confirmation-dialog.component';
import {map, switchMap} from 'rxjs/operators';
import {MockAuthService} from '../../services/mock-auth.service';

@Injectable()
export class ProductAdministrationLeaveGuard implements CanDeactivate<ProductAdministrationComponent> {

  constructor(private matDialog: MatDialog, private auth: MockAuthService) {
  }

  canDeactivate(component: ProductAdministrationComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {

    return this.auth.isUserLoggedIn$.pipe(
      switchMap(userLogedIn => {
        if (userLogedIn !== true) {
          return of(true);
        } else {
          return component.canLeave === true ? of(true) : this.matDialog.open(ConfirmationDialogComponent, {
            width: '500px',
            disableClose: true,
          }).afterClosed()
            .pipe(
              map((dialogResult) => {
                return dialogResult === 'ok';
              }));

        }
      })
    );
  }

}
