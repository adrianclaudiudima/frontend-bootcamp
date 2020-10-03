import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const WISHLIST_DISPOSE_NOTIFIER = new InjectionToken<Subject<any>>(
  'Cart Notificator'
);
