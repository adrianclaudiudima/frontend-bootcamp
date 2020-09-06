import {Component, OnInit} from '@angular/core';
import {combineLatest, fromEvent, interval, Observable, of} from 'rxjs';
import {catchError, delay, map, mergeMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product';

@Component({
  selector: 'app-observables',
  templateUrl: 'observables.component.html'
})
export class ObservablesComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // this.handleOldWay();
    this.handleRxJsWay();
  }


  handleRxJsWay(): void {
    // this.handleCombineLatest();
    // this.handleObservableCreation();
    // this.handleFromEvent();
  }


  private handleObservableCreation(): void {
    new Observable(subscriber => {
      let i = 0;
      setInterval(() => {
        console.log('EMIT NEXT');
        subscriber.next(i);
        i = i + 1;

        if (i === 4) {
          console.log('---EMIT ERROR---');
          subscriber.error('something went wrong');
        }
        if (i === 6) {
          subscriber.complete();
        }
        console.log('set interval still running');
      }, 2000);
    }).subscribe(next => {
      console.log('HANDLE NEXT FROM CALLBACK');
      // handle next event
    }, error => {
      console.log('HANDLER ERROR FROM CALLBACK');
      // handle error
    }, () => {
    });
  }

  private handleFromEvent(): void {
    fromEvent(document, 'click')
      .pipe(
        tap(ev => console.log(ev)),
        delay(1000),
        map<MouseEvent, ScreenPositions>((ev: MouseEvent) => {
          return {positionX: ev.screenX, positionY: ev.screenY};
        }),
        mergeMap(eventValue => interval(1000).pipe(
          take(10))),
        tap(v => console.log(v)),
      ).subscribe(value => {
    });
  }

  private handleCombineLatest(): void {
    combineLatest([
      this.httpClient.get<Product>('http://localhost:3000/products/1').pipe(
        map<Product, ResponseEntity<Product>>(product => {
          const response: ResponseEntity<Product> = {
            entity: product,
            status: Status.COMPLETE
          };
          return response;
        })
      ),
      this.httpClient.get('http://localhost:3001/products/2').pipe(
        map<Product, ResponseEntity<Product>>(product => {
          return {
            entity: product,
            status: Status.COMPLETE
          };
        }),
        catchError(error => {
          const responseEntity: ResponseEntity<Product> = {
            status: Status.ERROR,
            entity: undefined
          };
          return of(responseEntity);
        })
      )]
    ).subscribe(v => {
      v.filter(err => err.status === Status.ERROR).forEach(error => {
        // do something with what went wrong
      });
    });
  }

  handleOldWay(): void {
    let i = 0;
    document.addEventListener('click', ev => {
      setTimeout(() => {
        setInterval(() => {
          i = i + 1;
          console.log(i);
        }, 1000);
      }, 3000);
    });
  }


}

export interface ResponseEntity<T> {
  entity: T;
  status: Status;
}

export enum Status {
  ERROR = 'ERROR',
  COMPLETE = 'COMPLETE',
  NEW = 'NEW'
}

export interface ScreenPositions {
  positionX: number;
  positionY: number;
}
