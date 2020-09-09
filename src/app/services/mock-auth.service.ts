import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

export interface UserInfo {
  name: string;
}

@Injectable()
export class MockAuthService {

  private userInfoSubject: Subject<UserInfo> = new BehaviorSubject<UserInfo>(undefined);
  public user$: Observable<UserInfo> = this.userInfoSubject.asObservable();
  public isUserLoggedIn$: Observable<boolean> = this.user$.pipe(
    map(user => user !== undefined)
  );

  public login(name: string): void {
    this.userInfoSubject.next({name});
  }

  public logout(): void {
    this.userInfoSubject.next(undefined);
  }

}
