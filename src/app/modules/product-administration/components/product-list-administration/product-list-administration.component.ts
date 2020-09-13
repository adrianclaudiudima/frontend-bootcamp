import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product';
import {ProductsService} from '../../../../services/products.service';
import {ProductAdministrationService} from '../../services/product-administration.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list-administration',
  templateUrl: 'product-list-administration.component.html',
  styleUrls: ['product-list-administration.component.scss']
})
export class ProductListAdministrationComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productsService: ProductsService, private productAdministrationService: ProductAdministrationService) {
  }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(products => {
      this.products = products;
    });
  }


  removeProduct(id: number): void {
    this.productAdministrationService.removeProduct(id)
      .pipe(
        switchMap((value) => this.productsService.loadProducts()),
      ).subscribe(newListOfProducts => {
      this.products = newListOfProducts;
    });
  }

}
