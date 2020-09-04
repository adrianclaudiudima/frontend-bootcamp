import {Injectable} from '@angular/core';
import {FavoriteService} from './favorite.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CartService {

  constructor(private httpService: HttpClient) {
  }

}
