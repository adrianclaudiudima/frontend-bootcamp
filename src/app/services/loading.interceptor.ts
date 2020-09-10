import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, finalize} from 'rxjs/operators';
import {LoadingService} from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.incrementCount();
    return next.handle(req).pipe(
      filter(v => v instanceof HttpResponse),
      finalize(() => {
        this.loadingService.decrementCount();
      })
    );
  }
}
