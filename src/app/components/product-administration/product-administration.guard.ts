import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MockAuthService} from '../../services/mock-auth.service';
import {tap} from 'rxjs/operators';


@Injectable()
export class ProductAdministrationGuard implements CanActivate {

  constructor(private mockAuth: MockAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.mockAuth.isUserLoggedIn$.pipe(
      tap(v => {
        if (!v) {
          this.router.navigate(['/']);
        }
      })
    );
  }

}
