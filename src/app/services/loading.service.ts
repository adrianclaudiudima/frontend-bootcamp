import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class LoadingService {

  private count = 0;
  private countSubject: Subject<number> = new ReplaySubject(1);
  public count$: Observable<number> = this.countSubject.asObservable();

  public incrementCount(): void {
    this.count = this.count + 1;
    this.countSubject.next(this.count);
  }

  public decrementCount(): void {
    this.count = this.count - 1;
    this.countSubject.next(this.count);
  }


}
