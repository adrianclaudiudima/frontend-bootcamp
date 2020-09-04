import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FavoriteService {

  constructor(private httpClient: HttpClient) {
  }

  public getSomething(): number {
    return 42;
  }
}
