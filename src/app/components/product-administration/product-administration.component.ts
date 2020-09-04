import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';
import {FavoriteService} from '../../services/favorite.service';

@Component({
  selector: 'app-product-administration',
  templateUrl: 'product-administration.component.html',
  styleUrls: ['product-administration.component.scss']
})
export class ProductAdministrationComponent implements OnInit {

  products: Array<Product> = [];

  constructor(private productsService: ProductsService, private favoriteService: FavoriteService) {
    console.log(favoriteService.getSomething());
  }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(products => {
      this.products = products;
    });
  }

}
