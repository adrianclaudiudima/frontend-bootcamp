import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  favoriteCount = 0;
  favoriteSubscription: Subscription;

  constructor(private favoriteService: FavoriteService) {

  }

  ngOnInit(): void {
    this.favoriteSubscription = this.favoriteService.favoriteProducts$.subscribe(favoriteProducts => {
      this.favoriteCount = favoriteProducts.length;
    });
  }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
  }


}
