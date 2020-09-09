import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-product-list-administration',
  templateUrl: 'product-list-administration.component.html',
  styleUrls: ['product-list-administration.component.scss']
})
export class ProductListAdministrationComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(products => {
      this.products = products;
    });
  }


}
