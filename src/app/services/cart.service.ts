import {Injectable} from '@angular/core';
import {FavoriteService} from './favorite.service';
import {HttpClient} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';

@Injectable()
export class CartService {

  constructor(private httpService: HttpClient, private favoriteService: FavoriteService) {
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
