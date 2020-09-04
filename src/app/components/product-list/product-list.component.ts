import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Array<Product> = [];
  productsFavorite: Array<Product> = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(v => {
      this.products = v;
    });

  }

  handleProductAddedToFavorite(product: Product): void {
    this.productsFavorite.push(product);
  }

  ngOnDestroy(): void {
    console.log('On destroy from product list');
  }

}
