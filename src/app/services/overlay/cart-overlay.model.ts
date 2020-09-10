import {InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';

export const CART_DISPOSE_NOTIFIER = new InjectionToken<Subject<any>>('Cart Notificator');
