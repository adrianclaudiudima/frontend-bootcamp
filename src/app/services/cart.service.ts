import {Injectable} from '@angular/core';
import {FavoriteService} from './favorite.service';
import {HttpClient} from '@angular/common/http';
import {delay, take, tap} from 'rxjs/operators';
import {CartProduct} from '../model/product';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class CartService {

  serviceHostUrl = environment.serviceHostUrl;

  constructor(private httpService: HttpClient, private favoriteService: FavoriteService) {
  }

  placeOrder(orderedProducts: Array<CartProduct>): Observable<Array<CartProduct>> {
    return this.httpService.post<Array<CartProduct>>(this.serviceHostUrl +'/orders', orderedProducts);
  }

  removeAllExcept(idToBeExcludedFromRemoval: number): void {
    this.favoriteService.favoriteProducts$
      .pipe(
        tap(v => console.log('It works only if we have take 1')),
        take(1)
      )
      .subscribe(favoriteProducts => {
        this.favoriteService.setProducts(favoriteProducts.filter(pf => pf.id === idToBeExcludedFromRemoval));
      });

  }

}
