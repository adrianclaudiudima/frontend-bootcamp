import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {FavoriteService} from '../../../services/favorite.service';

@Component({
  selector: 'app-product-administration',
  templateUrl: 'product-administration.component.html',
  styleUrls: ['product-administration.component.scss']
})
export class ProductAdministrationComponent implements OnInit {

  canLeave = false;

  constructor(private productsService: ProductsService, private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {

  }

}
